import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.route.js";
import cors from "cors";
import { startCronJobForAutomaticFlightCreation } from "./service/cron-job.service.js";
import cookieParser from "cookie-parser";
import FlightService from "./service/flight.service.js";

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
// startCronJobForAutomaticFlightCreation();

const seed = async () => {
    const flightService = new FlightService();
    let i, date;
    try {
        for (i = 0; i < 8; i++) {
            let now = new Date("2025-10-27");
            now.setDate(now.getDate() + i);
            date = now.toISOString().split("T")[0];
            await flightService.createAutomationFlights(date);
            console.log(i, " : ", date);
        }
        console.log("✅ Seeding finished");
    } catch (error) {
        console.error("Seeding failed at i =", i, " date =", date, error);
    }
};
// seed();
