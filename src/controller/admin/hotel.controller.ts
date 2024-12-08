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
import moment from 'moment';
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
                    number_of_couples,
                    number_of_nights,
                    meal_plan,
                    resorts,
                    extra_adult_with_mattress,
                    extra_child_with_mattress,
                    extra_child_without_mattress,
                    vehicle_type,
                    pickup,
                    drop,
                    south_goa_tour,
                    north_goa_tour,
                    dudhsagar_tour,
                    activity_1,
                    activity_2,
                    activity_3,
                },
            } = req;
            console.log(pickup, drop, vehicle_type);

            const checkInDate = moment(check_in_date, 'YYYY-MM-DD');
            const checkOutDate = checkInDate
                .clone()
                .add(number_of_nights, 'days');
            console.log('Check-In Date:', checkInDate.format('YYYY-MM-DD'));
            console.log('Number of Nights:', number_of_nights);
            console.log('Check-Out Date:', checkOutDate.format('YYYY-MM-DD'));
            console.log('Meal Plan', meal_plan);
            const datesBetween = [];
            let currentDate = checkInDate.clone();
            while (currentDate.isBefore(checkOutDate)) {
                // Exclude the checkout date
                datesBetween.push(currentDate.format('YYYY-MM-DD')); // Add formatted date to the array
                currentDate.add(1, 'days'); // Move to the next day
            }
            const rates = [];
            console.log(resorts);
            const pickup_rate = await db[MODEL.PICKUPDROP].findOne({
                where: {
                    vehicle_type: vehicle_type,
                    type: 'PICKUP',
                    place: pickup,
                },
            });
            const drop_rate = await db[MODEL.PICKUPDROP].findOne({
                where: {
                    vehicle_type: vehicle_type,
                    type: 'DROP',
                    place: drop,
                },
            });
            const pickupdroprate =
                (pickup_rate?.rate + drop_rate?.rate) / number_of_couples;
            let activity_1_rate = 0;
            let activity_2_rate = 0;
            let activity_3_rate = 0;
            if (activity_1) {
                const activity = await db[MODEL.ACTIVITY].findOne({
                    where: {
                        activity_name: activity_1,
                    },
                });
                activity_1_rate = activity ? activity.rate : 0;
            }
            if (activity_2) {
                const activity = await db[MODEL.ACTIVITY].findOne({
                    where: {
                        activity_name: activity_2,
                    },
                });
                activity_2_rate = activity ? activity.rate : 0;
            }

            if (activity_3) {
                const activity = await db[MODEL.ACTIVITY].findOne({
                    where: {
                        activity_name: activity_3,
                    },
                });
                activity_3_rate = activity ? activity.rate : 0;
            }
            let south_goa_tour_rate = 0;
            if (south_goa_tour && south_goa_tour != 'NO') {
                const rate = await db[MODEL.SIGHTSEEING].findOne({
                    where: {
                        vehicle_type: vehicle_type,
                        type: south_goa_tour,
                        place: 'SOUTH GOA SIGHTSEEN',
                    },
                });
                south_goa_tour_rate = rate ? rate.rate : 0;
            }
            let north_goa_tour_rate = 0;
            if (north_goa_tour && north_goa_tour != 'NO') {
                const rate = await db[MODEL.SIGHTSEEING].findOne({
                    where: {
                        vehicle_type: vehicle_type,
                        type: north_goa_tour,
                        place: 'NORTH GOA SIGHTSEEN',
                    },
                });
                north_goa_tour_rate = rate ? rate.rate : 0;
            }
            let dudhsagar_tour_rate = 0;
            if (dudhsagar_tour && dudhsagar_tour != 'NO') {
                const rate = await db[MODEL.SIGHTSEEING].findOne({
                    where: {
                        vehicle_type: vehicle_type,
                        type: dudhsagar_tour,
                        place: 'DUDHSAGAR SIGHTSEEN',
                    },
                });
                dudhsagar_tour_rate = rate ? rate.rate : 0;
            }
            console.log('pickluodroip ', pickupdroprate);
            console.log('dudhsagar_tour_rate ', dudhsagar_tour_rate);
            console.log('north_goa_tour ', north_goa_tour_rate);
            console.log('south_goa_tour_rate ', south_goa_tour_rate);

            // for (const resort of resorts) {
            //     rates[resort] = [];
            //     for (const date of datesBetween) {
            //         const find_rate = await db[MODEL.HOTEL].findOne({
            //             where: {
            //                 hotel_name: resort,
            //                 date: date,
            //                 meal_plan: meal_plan,
            //             },
            //         });

            //         if (find_rate) {
            //             rates[resort].push({
            //                 rate: find_rate.rate,
            //                 date: find_rate.date,
            //                 extra_adult_with_mattress:
            //                     find_rate.extra_adult_with_mattress,
            //                 extra_child_with_mattress:
            //                     find_rate.extra_child_with_mattress,
            //                 extra_child_without_mattress:
            //                     find_rate.extra_child_without_mattress,
            //             });
            //         }
            //     }
            // }
            // const totalRates = {};
            // console.log(rates);

            // for (const resort in rates) {
            //     totalRates[resort] = rates[resort].reduce((sum, rateObj) => {
            //         const totalForDay =
            //             rateObj.rate +
            //             rateObj.extra_adult_with_mattress +
            //             rateObj.extra_child_with_mattress +
            //             rateObj.extra_child_without_mattress;
            //         return sum + totalForDay;
            //     }, 0);
            // }
            // console.log(totalRates);
            for (const resort of resorts) {
                let totalRate = 0;
                let totalExtraAdultWithMattress = 0;
                let totalExtrachildWithMattress = 0;
                let totalExtrachildWithoutMattress = 0;

                for (const date of datesBetween) {
                    const find_rate = await db[MODEL.HOTEL].findOne({
                        where: {
                            hotel_name: resort,
                            date: date,
                            meal_plan: meal_plan,
                        },
                    });

                    if (find_rate) {
                        totalRate += find_rate.rate;
                        totalExtraAdultWithMattress +=
                            find_rate.extra_adult_with_mattress;
                        totalExtrachildWithMattress +=
                            find_rate.extra_child_with_mattress;
                        totalExtrachildWithoutMattress +=
                            find_rate.extra_child_without_mattress;
                    }
                }

                if (
                    totalRate > 0 ||
                    totalExtraAdultWithMattress > 0 ||
                    totalExtrachildWithMattress > 0 ||
                    totalExtrachildWithoutMattress > 0
                ) {
                    rates.push({
                        [resort]: {
                            rate:
                                totalRate +
                                pickupdroprate +
                                activity_1_rate +
                                activity_2_rate +
                                activity_3_rate +
                                dudhsagar_tour_rate +
                                north_goa_tour_rate +
                                south_goa_tour_rate,
                            extra_adult_with_mattress:
                                totalExtraAdultWithMattress *
                                extra_adult_with_mattress,
                            extra_child_with_mattress:
                                totalExtrachildWithMattress *
                                extra_child_with_mattress,
                            extra_child_without_mattress:
                                totalExtrachildWithoutMattress *
                                extra_child_without_mattress,
                        },
                    });
                }
            }

            return sendResponse(res, req, {
                responseType: RES_STATUS.GET,
                data: rates,
                message: res.__('admin').create_hotel_rate,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const hotelController = new HotelController();
