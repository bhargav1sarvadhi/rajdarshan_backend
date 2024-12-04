import BaseRoute from '../base.routes';
import { END_POINTS } from '../../constant/index';
import { hotelController } from '../../controller/admin';

class HotelRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.post(
            END_POINTS.CREATE_HOTEL_RATE,
            hotelController.create_hotel_rate,
        );
    }
}
export const hotelRoutes = new HotelRoutes().router;
