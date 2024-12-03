import BaseRoute from '../base.routes';
import { END_POINTS, ROLES } from '../../constant/index';
import {
    accountController,
    tripController,
    userController,
} from '../../controller/user';
import { checkPermission, paginationMiddleware } from '../../middleware';
import { updateUserValidqtion } from '../../validation';

class UserRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.put(
            END_POINTS.UPDATE_USER,
            // updateUserValidqtion,
            userController.update_user,
        );
        this.router.put(
            END_POINTS.CHANGE_PASSWORD_USER,
            userController.change_password,
        );

        this.router.post(END_POINTS.CREATE_TRIP, tripController.create_trip);
        this.router.get(
            END_POINTS.TRIP_DETAILS,
            tripController.get_trip_details,
        );
        this.router.get(END_POINTS.GET_TRIPS, tripController.get_trips);
        this.router.post(
            END_POINTS.CREATE_ACCOUNT_DETAILS,
            accountController.create_accout_details,
        );
        this.router.get(
            END_POINTS.GET_ACCOUNTS,
            accountController.get_accounts,
        );
        this.router.get(
            END_POINTS.GET_ACCOUNTS_TOTAL,
            accountController.get_accounts_total,
        );
    }
}
export const userRoutes = new UserRoutes().router;
