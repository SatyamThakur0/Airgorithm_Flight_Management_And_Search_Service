import countryRoute from "./country.route.js";
import cityRoute from "./city.route.js";
import airportRoute from "./airport.route.js";
import airplaneRoute from "./airplane.route.js";
import flightRoute from "./flight.route.js";
import userRoute from "./user.route.js";
import { Router } from "express";

const router = Router();

router.use("/country", countryRoute);
router.use("/city", cityRoute);
router.use("/airport", airportRoute);
router.use("/airplane", airplaneRoute);
router.use("/flight", flightRoute);
router.use("/user", userRoute);

export default router;
