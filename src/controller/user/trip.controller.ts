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
import { TRIP_TYPE } from '../../constant/response.types';
import moment from 'moment';

class TripController {
    async create_trip(req, res, next) {
        try {
            // req.body.data.created_by = req.user.id;
            const create_trip = await db[MODEL.TRIP_DETAILS].create({
                trip_id: `TRIP-${Math.floor(Math.random() * 90000 + 10000)}`,
                ...req.body,
            });
            return sendResponse(res, req, {
                responseType: RES_STATUS.CREATE,
                data: create_trip,
                message: res.__('user').update_user,
            });
        } catch (error) {
            return next(error);
        }
    }
    async get_trip_details(req, res, next) {
        try {
            // req.body.data.created_by = req.user.id;
            const {
                params: { id },
            } = req;
            const trip_detaiils = await db[MODEL.TRIP_DETAILS].findOne({
                where: {
                    trip_id: id,
                },
            });
            return sendResponse(res, req, {
                responseType: RES_STATUS.GET,
                data: trip_detaiils,
                message: res.__('user').update_user,
            });
        } catch (error) {
            return next(error);
        }
    }

    async get_trips(req, res, next) {
        try {
            const {
                query: { type, search },
            } = req;

            let fillter: any = { where: {} };
            const currentDate = moment().format('YYYY-MM-DD');
            if (type === TRIP_TYPE.ONGOING) {
                fillter.where = {
                    departure_date: {
                        [Op.lte]: currentDate,
                    },
                    return_date: {
                        [Op.gte]: currentDate,
                    },
                };
            }

            if (type === TRIP_TYPE.UPCOMING) {
                fillter.where = {
                    departure_date: {
                        [Op.gt]: currentDate,
                    },
                };
            }

            if (type === TRIP_TYPE.COMPLETED) {
                fillter.where = {
                    return_date: {
                        [Op.lt]: currentDate,
                    },
                };
            }
            if (search) {
                fillter.where = {
                    ...fillter.where,
                    [Op.or]: [
                        { destination: { [Op.iLike]: `%${search}%` } },
                        { customer_phone: { [Op.iLike]: `%${search}%` } },
                        { customer_name: { [Op.iLike]: `%${search}%` } },
                        { trip_id: { [Op.iLike]: `%${search}%` } },
                        { arrival_place: { [Op.iLike]: `%${search}%` } },
                        { departure_place: { [Op.iLike]: `%${search}%` } },
                        { resort_name: { [Op.iLike]: `%${search}%` } },
                    ],
                };
            }
            const trips_detais = await db[MODEL.TRIP_DETAILS].findAll({
                ...fillter,
                order: [['createdAt', 'DESC']],
            });

            return sendResponse(res, req, {
                responseType: RES_STATUS.GET,
                data: trips_detais,
                message: res.__('user').update_user,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const tripController = new TripController();
