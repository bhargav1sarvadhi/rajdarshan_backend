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
import {
    CATEGORY_TYPE,
    PAID_TYPE,
    TRIP_TYPE,
} from '../../constant/response.types';
import moment from 'moment';

class AccoumtController {
    async create_accout_details(req, res, next) {
        try {
            req.body.created_by = req.user.id;
            req.body.role = req.user.role;
            const create_account = await db[MODEL.ACCOUNT_DETAILS].create(
                req.body,
            );
            console.log(req.body);

            if (
                req.body.trip_id &&
                req.body.category &&
                req.body.category === 'Sales'
            ) {
                const find_trip = await db[MODEL.TRIP_DETAILS].findOne({
                    where: { trip_id: req.body.trip_id },
                });
                console.log(find_trip);

                if (find_trip) {
                    const update = await db[MODEL.TRIP_DETAILS].update(
                        {
                            paid_amount: Number(
                                Number(req.body.amount) +
                                    Number(find_trip.paid_amount),
                            ),
                        },
                        {
                            where: { id: find_trip.id },
                        },
                    );
                    console.log(update);
                }
            }
            return sendResponse(res, req, {
                responseType: RES_STATUS.CREATE,
                data: create_account,
                message: res.__('user').update_user,
            });
        } catch (error) {
            return next(error);
        }
    }

    async get_accounts(req, res, next) {
        try {
            const {
                query: { category, name },
            } = req;

            let fillter: any = {
                where: {
                    role: req.user.role,
                },
            };
            if (
                [
                    CATEGORY_TYPE.B2B_PAYMENT,
                    CATEGORY_TYPE.EXPENSE,
                    CATEGORY_TYPE.MARKETING,
                    CATEGORY_TYPE.SALES,
                ].includes(category)
            ) {
                fillter.where = {
                    ...fillter.where,
                    category: category,
                };
            }
            if (
                [PAID_TYPE.BHARGAV, PAID_TYPE.JAYDIP, PAID_TYPE.YASH].includes(
                    category,
                )
            ) {
                fillter.where = {
                    ...fillter.where,
                    paid_by: category,
                };
            }
            console.log(fillter, category);

            const account_details = await db[MODEL.ACCOUNT_DETAILS].findAll({
                ...fillter,
                order: [['createdAt', 'DESC']],
            });

            const totalAmount = account_details.reduce((total, account) => {
                return total + (account.amount || 0); // Ensure to handle null or undefined amounts
            }, 0);

            return sendResponse(res, req, {
                responseType: RES_STATUS.GET,
                data: { account_details, total: totalAmount },
                message: res.__('user').update_user,
            });
        } catch (error) {
            return next(error);
        }
    }
    async get_accounts_total(req, res, next) {
        try {
            const sales = await db[MODEL.ACCOUNT_DETAILS].findAll({
                where: {
                    category: CATEGORY_TYPE.SALES,
                    role: req.user.role,
                },
                order: [['createdAt', 'DESC']],
            });
            const sales_total = sales.reduce((total, account) => {
                return total + (account.amount || 0);
            }, 0);
            const marketing = await db[MODEL.ACCOUNT_DETAILS].findAll({
                where: {
                    category: CATEGORY_TYPE.MARKETING,
                    role: req.user.role,
                },
                order: [['createdAt', 'DESC']],
            });
            const marketing_total = marketing.reduce((total, account) => {
                return total + (account.amount || 0);
            }, 0);
            const B2b = await db[MODEL.ACCOUNT_DETAILS].findAll({
                where: {
                    category: CATEGORY_TYPE.B2B_PAYMENT,
                    role: req.user.role,
                },
                order: [['createdAt', 'DESC']],
            });
            const B2b_total = B2b.reduce((total, account) => {
                return total + (account.amount || 0);
            }, 0);
            const Expenses = await db[MODEL.ACCOUNT_DETAILS].findAll({
                where: {
                    category: CATEGORY_TYPE.EXPENSE,
                    role: req.user.role,
                },
                order: [['createdAt', 'DESC']],
            });
            const Expenses_total = Expenses.reduce((total, account) => {
                return total + (account.amount || 0);
            }, 0);
            const Yash = await db[MODEL.ACCOUNT_DETAILS].findAll({
                where: {
                    paid_by: PAID_TYPE.YASH,
                    role: req.user.role,
                },
                order: [['createdAt', 'DESC']],
            });
            const yash_total = Yash.reduce((total, account) => {
                return total + (account.amount || 0);
            }, 0);
            const Bhargav = await db[MODEL.ACCOUNT_DETAILS].findAll({
                where: {
                    paid_by: PAID_TYPE.BHARGAV,
                    role: req.user.role,
                },
                order: [['createdAt', 'DESC']],
            });
            const bhargav_total = Bhargav.reduce((total, account) => {
                return total + (account.amount || 0);
            }, 0);
            const Jaydip = await db[MODEL.ACCOUNT_DETAILS].findAll({
                where: {
                    paid_by: PAID_TYPE.JAYDIP,
                    role: req.user.role,
                },
                order: [['createdAt', 'DESC']],
            });
            const jaydip_total = Jaydip.reduce((total, account) => {
                return total + (account.amount || 0);
            }, 0);

            return sendResponse(res, req, {
                responseType: RES_STATUS.GET,
                data: {
                    sales_total,
                    B2b_total,
                    Expenses_total,
                    marketing_total,
                    yash_total,
                    bhargav_total,
                    jaydip_total,
                },
                message: res.__('user').update_user,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const accountController = new AccoumtController();
