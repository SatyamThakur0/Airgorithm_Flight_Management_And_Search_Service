import { Router } from "express";
import CountryController from "../controllers/country.controller.js";
const router = Router();
const countryController = new CountryController();

router.post("/", countryController.createCountryController);

router.delete("/delete/:id", countryController.deleteCountryController);

router.get("/", countryController.getAllCountryController);

router.get("/:id", countryController.getCountryByIdController);

router.get("/name/:name", countryController.getCountryByNameController);

router.get("/code/:code", countryController.getCountryByCodeController);

router.patch(
    "/update/name/:id",
    countryController.updateCountryNameController
);

router.patch(
    "/update/code/:id",
    countryController.updateCountryCodeController
);

export default router;
