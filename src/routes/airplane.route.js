import { Router } from "express";
import AirplaneController from "../controllers/airplane.controller.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
const router = Router();
const airplaneController = new AirplaneController();

router.post(
    "/",
    adminAuthMiddleware.authenticate,
    airplaneController.createAirplaneController
);
router.get(
    "/:id",
    adminAuthMiddleware.authenticate,
    airplaneController.getAirplaneByIdController
);
router.get(
    "/",
    adminAuthMiddleware.authenticate,
    airplaneController.getAllAirplaneController
);
router.get(
    "/name/:name",
    adminAuthMiddleware.authenticate,
    airplaneController.getAirplaneByNameController
);
router.get(
    "/code/:code",
    adminAuthMiddleware.authenticate,
    airplaneController.getAirplaneByCodeController
);
router.get(
    "/airplane/search/:name",
    adminAuthMiddleware.authenticate,
    airplaneController.getAirplanesByNameREController
);
router.delete(
    "/:id",
    adminAuthMiddleware.authenticate,
    airplaneController.deleteAirplaneController
);
router.patch(
    "/name/:id",
    adminAuthMiddleware.authenticate,
    airplaneController.updateAirplaneNameController
);
router.patch(
    "/code/:id",
    adminAuthMiddleware.authenticate,
    airplaneController.updateAirplaneCodeController
);

export default router;
