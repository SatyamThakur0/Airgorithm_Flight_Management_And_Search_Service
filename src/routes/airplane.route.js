import { Router } from "express";
import AirplaneController from "../controllers/airplane.controller.js";
const router = Router();
const airplaneController = new AirplaneController();

router.post("/", airplaneController.createAirplaneController);
router.get("/:id", airplaneController.getAirplaneByIdController);
router.get("/", airplaneController.getAllAirplaneController);
router.get("/name/:name", airplaneController.getAirplaneByNameController);
router.get("/code/:code", airplaneController.getAirplaneByCodeController);
router.delete("/:id", airplaneController.deleteAirplaneController);
router.patch("/name/:id", airplaneController.updateAirplaneNameController);
router.patch("/code/:id", airplaneController.updateAirplaneCodeController);
router.patch("/capacity/:id", airplaneController.updateAirplaneCapacityController);

export default router;
