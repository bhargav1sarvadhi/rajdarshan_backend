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
import { date } from 'joi';
function getDatesBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
        throw new Error('Start date must be before end date');
    }

    const dates = [];
    while (start <= end) {
        dates.push(new Date(start).toISOString().split('T')[0]); // Push as YYYY-MM-DD
        start.setDate(start.getDate() + 1);
    }
    return dates;
}

class HotelController {
    async create_hotel_rate(req, res, next) {
        try {
            const {
                body: {
                    hotel_name,
                    start_date,
                    end_date,
                    meal_plan,
                    rate,
                    extra_adult_with_mattress,
                    extra_child_with_mattress,
                    extra_child_without_mattress,
                },
            } = req;
            const dates = getDatesBetween(start_date, end_date);
            console.log(dates);

            dates.map(async (current_date) => {
                const [find_hotel, created] = await db[
                    MODEL.HOTEL
                ].findOrCreate({
                    where: {
                        hotel_name: hotel_name,
                        date: current_date,
                        meal_plan: meal_plan,
                    }, // Match based on the hotel name
                    defaults: {
                        hotel_name,
                        date: current_date,
                        meal_plan,
                        rate,
                        extra_adult_with_mattress,
                        extra_child_with_mattress,
                        extra_child_without_mattress,
                    }, // Provide additional details for creation if it doesn't exist
                });

                if (find_hotel) {
                    const update = await db[MODEL.HOTEL].update(
                        {
                            rate,
                            extra_adult_with_mattress,
                            extra_child_with_mattress,
                            extra_child_without_mattress,
                        },
                        {
                            where: {
                                hotel_name: hotel_name,
                                date: current_date,
                                meal_plan: meal_plan,
                            },
                        },
                    );
                }
            });
            return sendResponse(res, req, {
                responseType: RES_STATUS.CREATE,
                message: res.__('admin').create_hotel_rate,
            });
        } catch (error) {
            return next(error);
        }
    }
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
