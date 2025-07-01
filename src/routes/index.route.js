import countryRoute from "./country.route.js";

import { Router } from "express";

const router = Router();

router.use("/country", countryRoute);

export default router;
