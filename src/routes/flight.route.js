import { Router } from "express";
import FlightController from "../controllers/flight.controller.js";

const router = Router();
const flightController = new FlightController();

router.post("/", flightController.createFlightController);
router.get("/", flightController.getAllFlightsController);
router.get(
    "/search",
    flightController.getFlightsByDestinationAndSourceCityIdController
);
router.get("/:id", flightController.getFlightByIdController);
router.get(
    "/number/:flightNumber",
    flightController.getFlightByFlightNumberController
);
router.get("/flight-automation/:date", flightController.createAutomationFlightsController);
router.delete("/:id", flightController.deleteFlightController);
router.patch(
    "/source-airport/:id",
    flightController.updateFlightSourceAirportController
);
router.patch(
    "/destination-airport/:id",
    flightController.updateFlightDestinationAirportController
);
router.patch("/airplane/:id", flightController.updateFlightAirplaneController);
router.patch("/price/:id", flightController.updateFlightPriceController);
router.patch(
    "/update/booked-seat/:id",
    flightController.updateFlightSeatController
);
router.post("/cycle", flightController.createFlightCycleController);

export default router;
