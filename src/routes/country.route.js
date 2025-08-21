import { Router } from "express";
import CountryController from "../controllers/country.controller.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
const router = Router();
const countryController = new CountryController();

router.post(
    "/",
    adminAuthMiddleware.authenticate,
    countryController.createCountryController
);

router.delete(
    "/delete/:id",
    adminAuthMiddleware.authenticate,
    countryController.deleteCountryController
);

router.get(
    "/",
    adminAuthMiddleware.authenticate,
    countryController.getAllCountryController
);

router.get(
    "/:id",
    adminAuthMiddleware.authenticate,
    countryController.getCountryByIdController
);

router.get(
    "/name/:name",
    adminAuthMiddleware.authenticate,
    countryController.getCountryByNameController
);

router.get(
    "/code/:code",
    adminAuthMiddleware.authenticate,
    countryController.getCountryByCodeController
);

router.get(
    "/country/search/:name",
    adminAuthMiddleware.authenticate,
    countryController.getCountriesByNameREController
);

router.patch(
    "/update/name/:id",
    adminAuthMiddleware.authenticate,
    countryController.updateCountryNameController
);

router.patch(
    "/update/code/:id",
    adminAuthMiddleware.authenticate,
    countryController.updateCountryCodeController
);

export default router;
