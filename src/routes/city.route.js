import { Router } from "express";
import CityController from "../controllers/city.controller.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
const router = Router();
const cityController = new CityController();

router.post(
    "/",
    adminAuthMiddleware.authenticate,
    cityController.createCityController
);
router.get(
    "/:id",
    adminAuthMiddleware.authenticate,
    cityController.getCityByIdController
);
router.get(
    "/",
    adminAuthMiddleware.authenticate,
    cityController.getAllCityController
);
router.get(
    "/name/:name",
    adminAuthMiddleware.authenticate,
    cityController.getCityByNameController
);
router.get(
    "/city/search/:name",
    adminAuthMiddleware.authenticate,
    cityController.getCitiesByNameREController
);
router.delete(
    "/:id",
    adminAuthMiddleware.authenticate,
    cityController.deleteCityController
);
router.patch(
    "/:id",
    adminAuthMiddleware.authenticate,
    cityController.updateCityNameController
);

export default router;
