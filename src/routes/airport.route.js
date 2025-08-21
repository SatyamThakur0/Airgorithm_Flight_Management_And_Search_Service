import { Router } from "express";
import AirportController from "../controllers/airport.controller.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
const router = Router();
const airportController = new AirportController();

router.post(
    "/",
    adminAuthMiddleware.authenticate,
    airportController.createAirportController
); // ok
router.get(
    "/:id",
    airportController.getAirportByIdController
); // ok
router.get(
    "/",
    adminAuthMiddleware.authenticate,
    airportController.getAllAirportController
); // ok
router.get(
    "/name/:name",
    adminAuthMiddleware.authenticate,
    airportController.getAirportByNameController
); // ok
router.get(
    "/code/:code",
    adminAuthMiddleware.authenticate,
    airportController.getAirportByCodeController
); // ok
router.delete(
    "/:id",
    adminAuthMiddleware.authenticate,
    airportController.deleteAirportController
);
router.patch(
    "/name/:id",
    adminAuthMiddleware.authenticate,
    airportController.updateAirportNameController
);
router.patch(
    "/code/:id",
    adminAuthMiddleware.authenticate,
    airportController.updateAirportCodeController
);
router.get(
    "/city/name/:name",
    airportController.getAirportsInCityByCityNameController
);
router.get(
    "/airport/search/:name",
    airportController.getAirportsByCityNameREController
);
router.get(
    "/city/id/:id",
    adminAuthMiddleware.authenticate,
    airportController.getAirportsInCityByCityIdController
);

export default router;
