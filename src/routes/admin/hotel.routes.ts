import BaseRoute from '../base.routes';
import { END_POINTS, ROLES } from '../../constant/index';
import { hotelController } from '../../controller/admin';
import { checkPermission } from '../../middleware';

class HotelRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.post(
            END_POINTS.CREATE_HOTEL_RATE,
            checkPermission([ROLES.SUPER_ADMIN]),
            hotelController.create_hotel_rate,
        );
        this.router.post(
            END_POINTS.GET_HOTEL_RATE,
            // checkPermission([ROLES.SUPER_ADMIN, ROLES.USER]),
            hotelController.get_rates,
        );
        this.router.post(
            END_POINTS.CREATE_PICKUPDROP_RATE,
            checkPermission([ROLES.SUPER_ADMIN]),
            hotelController.create_pickupdrop_rate,
        );
        this.router.post(
            END_POINTS.CREATE_SIGHTSEEING_RATE,
            checkPermission([ROLES.SUPER_ADMIN]),

            hotelController.create_sightseeing_rate,
        );
        this.router.post(
            END_POINTS.CREATE_ACTIVITY_RATE,
            checkPermission([ROLES.SUPER_ADMIN]),
            hotelController.activity_rate,
        );
    }
}
export const hotelRoutes = new HotelRoutes().router;
