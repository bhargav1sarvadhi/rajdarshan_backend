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
    async create_pickupdrop_rate(req, res, next) {
        try {
            const {
                body: { vehicle_type, type, place, rate },
            } = req;

            const [find_rate, created] = await db[
                MODEL.PICKUPDROP
            ].findOrCreate({
                where: {
                    vehicle_type,
                    type,
                    place,
                },
                defaults: {
                    vehicle_type,
                    type,
                    place,
                    rate,
                },
            });

            if (find_rate) {
                const update = await db[MODEL.PICKUPDROP].update(
                    {
                        rate,
                    },
                    {
                        where: {
                            vehicle_type,
                            type,
                            place,
                        },
                    },
                );
            }

            return sendResponse(res, req, {
                responseType: RES_STATUS.CREATE,
                message: res.__('admin').create_hotel_rate,
            });
        } catch (error) {
            return next(error);
        }
    }
    async create_sightseeing_rate(req, res, next) {
        try {
            const {
                body: { vehicle_type, type, place, rate },
            } = req;

            const [find_rate, created] = await db[
                MODEL.SIGHTSEEING
            ].findOrCreate({
                where: {
                    vehicle_type,
                    type,
                    place,
                }, // Match based on the hotel name
                defaults: {
                    vehicle_type,
                    type,
                    place,
                    rate,
                }, // Provide additional details for creation if it doesn't exist
            });

            if (find_rate) {
                const update = await db[MODEL.SIGHTSEEING].update(
                    {
                        rate,
                    },
                    {
                        where: {
                            vehicle_type,
                            type,
                            place,
                        },
                    },
                );
            }

            return sendResponse(res, req, {
                responseType: RES_STATUS.CREATE,
                message: res.__('admin').create_hotel_rate,
            });
        } catch (error) {
            return next(error);
        }
    }
    async activity_rate(req, res, next) {
        try {
            const {
                body: { activity_name, rate },
            } = req;

            const [find_rate, created] = await db[MODEL.ACTIVITY].findOrCreate({
                where: {
                    activity_name,
                },
                defaults: {
                    activity_name,
                    rate,
                },
            });

            if (find_rate) {
                const update = await db[MODEL.ACTIVITY].update(
                    {
                        rate,
                    },
                    {
                        where: {
                            activity_name,
                        },
                    },
                );
            }

            return sendResponse(res, req, {
                responseType: RES_STATUS.CREATE,
                message: res.__('admin').create_hotel_rate,
            });
        } catch (error) {
            return next(error);
        }
    }
    async get_rates(req, res, next) {
        try {
            const {
                body: {
                    check_in_date,
                    number_of_nights,
                    meal_plan,
                    extra_adult_with_mattress,
                    extra_child_with_mattress,
                    extra_child_without_mattress,
                    vehicle_type,
                    pickup,
                    drop,
                    south_goa_tour,
                    north_goa_tour,
                    activity_1,
                    activity_2,
                    activity_3,
                },
            } = req;

            return sendResponse(res, req, {
                responseType: RES_STATUS.CREATE,
                message: res.__('admin').create_hotel_rate,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const hotelController = new HotelController();
