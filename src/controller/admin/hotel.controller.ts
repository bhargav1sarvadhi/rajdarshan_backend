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

class HotelController {
    async delete_hotel(req, res, next) {
        try {
            const {
                params: { id },
            } = req;
            const delete_user = await db[MODEL.HOTEL].destroy({
                where: { id },
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
}

export const hotelController = new HotelController();
