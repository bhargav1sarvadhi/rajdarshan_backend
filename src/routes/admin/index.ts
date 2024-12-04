import BaseRoute from '../base.routes';
import { END_POINTS, ROLES } from '../../constant/index';
import { adminUserRoutes } from './admin.routes';
import { hotelRoutes } from './hotel.routes';
import { checkPermission } from '../../middleware';

class AdminRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.use(
            END_POINTS.USER,
            checkPermission([ROLES.SUPER_ADMIN]),
            adminUserRoutes,
        );
        this.router.use(END_POINTS.HOTEL, hotelRoutes);
    }
}
export const adminRoutes = new AdminRoutes().router;
