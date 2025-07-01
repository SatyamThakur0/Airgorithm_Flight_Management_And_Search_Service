import countryRoute from "./country.route.js";
import cityRoute from "./city.route.js";
import airportRoute from "./airport.route.js";
import { Router } from "express";

const router = Router();

router.use("/country", countryRoute);
router.use("/city", cityRoute);
router.use("/airport", airportRoute);

export default router;
