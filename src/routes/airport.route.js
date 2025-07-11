import { Router } from "express";
import AirportController from "../controllers/airport.controller.js";
const router = Router();
const airportController = new AirportController();

router.post("/", airportController.createAirportController); // ok
router.get("/:id", airportController.getAirportByIdController); // ok
router.get("/", airportController.getAllAirportController); // ok
router.get("/name/:name", airportController.getAirportByNameController); // ok
router.get("/code/:code", airportController.getAirportByCodeController); // ok
router.delete("/:id", airportController.deleteAirportController);
router.patch("/name/:id", airportController.updateAirportNameController);
router.patch("/code/:id", airportController.updateAirportCodeController);
router.get(
    "/city/name/:name",
    airportController.getAirportsInCityByCityNameController
);
router.get(
    "/city/search/:name",
    airportController.getAirportsByCityNameREController
);
router.get(
    "/city/id/:id",
    airportController.getAirportsInCityByCityIdController
);

export default router;
