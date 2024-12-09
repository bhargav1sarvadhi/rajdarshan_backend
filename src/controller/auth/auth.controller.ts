import { db } from '../../model';
import dotenv from 'dotenv';
dotenv.config();
import {
    ERRORTYPES,
    MODEL,
    NotificationTypes,
    RES_STATUS,
    RES_TYPES,
    ROLES,
} from '../../constant';
import { AppError, SendNotificationEmail, sendResponse } from '../../utils';
import { TokenController } from '../../config/passport.jwt';
import * as jwt from 'jsonwebtoken';
import { generateRandomNumber } from '../../utils/random.string';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

class AuthController {
    async login(req, res, next) {
        try {
            const {
                body: { email, password },
            } = req;
            const result = await db[MODEL.USER].findOne({
                where: { email },
            });
            if (result && result.authenticate(password)) {
                const payload = {
                    id: result.id,
                    email: result.email,
                    phone: result.phone,
                };
                const token = await TokenController.createToken(payload, next);
                return sendResponse(res, req, {
                    success: true,
                    data: {
                        token: token,
                        id: result.id,
                        role: result.role,
                        email: result.email,
                    },
                    message: res.__('common').login,
                });
            } else {
                return next(
                    new AppError(RES_TYPES.AUTH_FAIL, ERRORTYPES.UNAUTHORIZED),
                );
            }
        } catch (error) {
            return next(error);
        }
    }

    async verify_user(req, res, next) {
        try {
            const { token } = req.query;
            const data = jwt.verify(token, process.env.JWT_SECERET);
            if (!data) {
                return next(
                    new AppError(
                        RES_TYPES.INTERNAL_SERVER_ERROR,
                        ERRORTYPES.INVALID_REQUEST,
                    ),
                );
            }
            const userData = await db[MODEL.USER].findOne({
                where: { id: data['id'] },
            });
            if (userData) {
                await db[MODEL.USER].update(
                    {
                        is_verified: true,
                    },
                    {
                        where: { id: data['id'] },
                    },
                );

                return sendResponse(res, req, {
                    responseType: RES_STATUS.GET,
                    message: res.__('user').verify_success,
                });
            } else {
                return next(
                    new AppError(
                        RES_TYPES.INTERNAL_SERVER_ERROR,
                        ERRORTYPES.INVALID_REQUEST,
                    ),
                );
            }
        } catch (error) {
            console.log({ error });
            return next(error);
        }
    }

    async sign_up(req, res, next) {
        try {
            const {
                body: { email },
            } = req;
            const exist_user = await db[MODEL.USER].findOne({
                where: sequelize.where(
                    sequelize.fn('LOWER', sequelize.col('email')),
                    email?.toLowerCase(),
                ),
            });

            if (exist_user) {
                return next(
                    new AppError(RES_TYPES.USER_EXISTS, ERRORTYPES.CONFLICT),
                );
            }
            req.body.role = ROLES.USER;
            const create_user = await db[MODEL.USER].create(req.body);
            const token = await TokenController.createToken(
                {
                    id: create_user.id,
                    email: create_user.email,
                    phone: create_user.phone,
                },
                next,
            );
            return sendResponse(res, req, {
                responseType: RES_STATUS.CREATE,
                data: {
                    token: token,
                    id: create_user.id,
                    email: create_user.email,
                    role: create_user.role,
                },
                message: res.__('user').create,
            });
        } catch (error) {
            return next(error);
        }
    }

    async admin_sign_up(req, res, next) {
        try {
            const {
                body: {
                    data: { email },
                },
            } = req;
            const exist_user = await db[MODEL.USER].findOne({
                where: { email },
            });
            if (exist_user) {
                return next(
                    new AppError(RES_TYPES.USER_EXISTS, ERRORTYPES.CONFLICT),
                );
            }
            req.body.data.role = ROLES.SUPER_ADMIN;
            const create_user = await db[MODEL.USER].create(req.body.data);
            const token = await TokenController.createToken(
                {
                    id: create_user.id,
                    email: create_user.email,
                    phone: create_user.phone,
                },
                next,
            );

            return sendResponse(res, req, {
                responseType: RES_STATUS.CREATE,
                data: {
                    token: token,
                    id: create_user.id,
                    first_name: create_user.first_name,
                    last_name: create_user.last_name,
                    email: create_user.email,
                    role: create_user.role,
                    phone: create_user.phone,
                },
                message: res.__('user').create,
            });
        } catch (error) {
            return next(error);
        }
    }

    async admin_login(req, res, next) {
        try {
            const {
                body: { email, password, role },
            } = req;
            const result = await db[MODEL.USER].findOne({
                where: { email, role: role },
            });
            if (result && result.authenticate(password)) {
                const payload = {
                    id: result.id,
                    email: result.email,
                    phone: result.phone,
                };
                const token = await TokenController.createToken(payload, next);
                return sendResponse(res, req, {
                    success: true,
                    data: {
                        token: token,
                        id: result.id,
                        role: result.role,
                        email: result.email,
                    },
                    message: res.__('common').login,
                });
            } else {
                return next(
                    new AppError(RES_TYPES.AUTH_FAIL, ERRORTYPES.UNAUTHORIZED),
                );
            }
        } catch (error) {
            return next(error);
        }
    }

    async forgot_password(req, res, next) {
        try {
            const {
                params: { email },
                query: { is_outlet_admin, language },
            } = req;
            let search_filter: { [key: string]: any } = { role: ROLES.USER };
            if (is_outlet_admin === '1') {
                search_filter = { role: ROLES.OUTLET_ADMIN };
            }
            const result = await db[MODEL.USER].findOne({
                where: { email, ...search_filter },
            });
            if (!result) {
                return next(
                    new AppError(
                        RES_TYPES.EMAIL_VALID,
                        ERRORTYPES.UNAUTHORIZED,
                    ),
                );
            }
            const generateOTP = () => {
                const otp = Math.floor(1000 + Math.random() * 9000);
                return otp.toString();
            };
            const otp = generateOTP();
            const [existingotp, created] = await db[MODEL.OTP].findOrCreate({
                where: { email: email },
                defaults: {
                    email: email,
                    otp: otp,
                },
            });
            if (!created) {
                const update_otp = await db[MODEL.OTP].update(
                    { otp: otp, is_verified: false },
                    { where: { email: email } },
                );
            }
            const sendmail = new SendNotificationEmail(
                NotificationTypes.FORGOT_PSW,
                email,
                {
                    otp,
                    language: language,
                },
            );
            return sendResponse(res, req, {
                responseType: RES_STATUS.GET,
                message: res.__('common').otp_send,
            });
        } catch (error) {
            return next(error);
        }
    }

    async verfiy_otp(req, res, next) {
        try {
            const {
                body: {
                    data: { email, otp },
                },
            } = req;
            const verify_otp = await db[MODEL.OTP].findOne({
                where: {
                    email,
                    otp,
                    is_verified: false,
                },
            });
            if (!verify_otp) {
                return next(
                    new AppError(RES_TYPES.WRONG_OTP, ERRORTYPES.UNAUTHORIZED),
                );
            }
            const token = await TokenController.createToken(
                { email: email, otp },
                next,
            );
            await db[MODEL.OTP].update(
                { is_verified: true },
                { where: { id: verify_otp.id } },
            );
            return sendResponse(res, req, {
                responseType: RES_STATUS.GET,
                data: token,
                message: res.__('common').otp_verified,
            });
        } catch (error) {
            return next(error);
        }
    }

    async change_password(req, res, next) {
        try {
            const {
                body: { email, password },
            } = req;
            console.log(password);

            const update_password = await db[MODEL.USER].update(
                { password },
                { where: { email: email } },
            );

            return sendResponse(res, req, {
                responseType: RES_STATUS.GET,
                message: res.__('common').update_password,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const authController = new AuthController();
