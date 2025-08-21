import cron from "node-cron";
import FlightService from "./flight.service.js";
const flightService = new FlightService();
export function startCronJobForAutomaticFlightCreation() {
    cron.schedule("0 0 * * *", () => {
        const now = new Date();
        now.setUTCDate(now.getUTCDate() + 60);
        const targetDate = now.toISOString().split("T")[0];
        console.log(targetDate);
        flightService.createAutomationFlights(targetDate);
    });
    cron.schedule("*/5 * * * * *", () => {
        console.log(new Date());
    });
}
