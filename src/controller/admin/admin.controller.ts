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

class AdminController {
    async delete_user(req, res, next) {
        try {
            const {
                body: { email },
            } = req;
            const delete_user = await db[MODEL.USER].destroy({
                where: { email: email },
            });
            if (!delete_user) {
                return next(
                    new AppError(RES_TYPES.ID_NOT_FOUND, ERRORTYPES.NOT_FOUND),
                );
            }
            return sendResponse(res, req, {
                responseType: RES_STATUS.DELETE,
                message: res.__('admin').delete_user,
            });
        } catch (error) {
            return next(error);
        }
    }

    async admin_user_password_change(req, res, next) {
        try {
            const {
                params: { user_id },
                body: {
                    data: { password },
                },
            } = req;

            if (!password) {
                return next(
                    new AppError(
                        RES_TYPES.PASSWORD_REQUIRED,
                        ERRORTYPES.NOT_FOUND,
                    ),
                );
            }
            const admin_user_password_change = await db[MODEL.USER].update(
                { password: password },
                { where: { id: user_id, role: ROLES.USER } },
            );
            return sendResponse(res, req, {
                responseType: RES_STATUS.UPDATE,
                message: res.__('outlet').password_update,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const adminController = new AdminController();
