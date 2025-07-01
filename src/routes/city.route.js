import { Router } from "express";
import CityController from "../controllers/city.controller.js";
const router = Router();
const cityController = new CityController();

router.post("/", cityController.createCityController);
router.get("/:id", cityController.getCityByIdController);
router.get("/", cityController.getAllCityController);
router.get("/name/:name", cityController.getCityByNameController);
router.delete("/:id", cityController.deleteCityController);
router.patch("/:id", cityController.updateCityNameController);

export default router;
