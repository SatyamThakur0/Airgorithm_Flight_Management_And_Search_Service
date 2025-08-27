import cron from "node-cron";
import FlightService from "./flight.service.js";
const flightService = new FlightService();
export async function startCronJobForAutomaticFlightCreation() {
    try {
        cron.schedule("0 0 * * *", () => {
            const now = new Date();
            now.setUTCDate(now.getUTCDate() + 60);
            const targetDate = now.toISOString().split("T")[0];
            console.log(targetDate);
            flightService.createAutomationFlights(targetDate);
        });
        cron.schedule("*/5 * * * * *", async () => {
            let res = await fetch(`${process.env.SELF}`);
            res = await res.json();
            console.log(res.message, " : ", new Date().getSeconds());
        });
    } catch (error) {
        console.log(error.message);
    }
}
