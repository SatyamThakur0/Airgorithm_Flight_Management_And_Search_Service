import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.route.js";
import cors from "cors";
import { startCronJobForAutomaticFlightCreation } from "./service/cron-job.service.js";
import cookieParser from "cookie-parser";

dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL;
const ADMIN_PANEL_URL = process.env.ADMIN_PANEL_URL;
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: [FRONTEND_URL, ADMIN_PANEL_URL],
        credentials: true,
    })
);

app.get("/", (req, res) => {
    return res.json({
        ok: true,
        message: "Flight Management Service is Running...",
    });
});

app.use("/flight", router);

app.listen(PORT, () => {
    console.log(`Flight Management Service is Running on PORT : ${PORT}`);
});
startCronJobForAutomaticFlightCreation();
