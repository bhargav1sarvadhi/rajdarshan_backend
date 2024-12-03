import { db } from '../../model';
import dotenv from 'dotenv';
dotenv.config();
import {
    ERRORTYPES,
    MODEL,
    RES_STATUS,
    RES_TYPES,
    ROLES,
} from '../../constant';
import { AppError, sendResponse } from '../../utils';
import { Op, Sequelize } from 'sequelize';
import { deleteImageAWS, upload_image } from '../../helpers';
import path from 'path';
import moment from 'moment';
import sharp from 'sharp';
import sequelize from 'sequelize';

class UserController {
    async update_user(req, res, next) {
        try {
            const {
                body: {
                    data: { email },
                },
                params: { id },
            } = req;
            const exist_user = await db[MODEL.USER].findOne({
                where: { email },
            });
            if (exist_user && exist_user.id !== id) {
                return next(
                    new AppError(RES_TYPES.USER_EXISTS, ERRORTYPES.CONFLICT),
                );
            }
            const update_user = await db[MODEL.USER].update(req.body.data, {
                where: { id },
            });
            return sendResponse(res, req, {
                responseType: RES_STATUS.UPDATE,
                message: res.__('user').update_user,
            });
        } catch (error) {
            return next(error);
        }
    }


    async change_password(req, res, next) {
        try {
            const {
                params: { user_id },
                body: {
                    data: { old_password, new_password },
                },
            } = req;

            const exist_user = await db[MODEL.USER].findOne({
                where: { id: user_id },
            });
            if (!exist_user.authenticate(old_password)) {
                return next(
                    new AppError(
                        RES_TYPES.WRONG_PASSWORD,
                        ERRORTYPES.NOT_FOUND,
                    ),
                );
            }
            const update_password = await db[MODEL.USER].update(
                { password: new_password, is_first_login: false },
                { where: { id: user_id } },
            );
            return sendResponse(res, req, {
                responseType: RES_STATUS.UPDATE,
                message: res.__('user').update_password,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const userController = new UserController();
