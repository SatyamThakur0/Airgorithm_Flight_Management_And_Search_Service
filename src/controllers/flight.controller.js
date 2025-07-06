import { DatabaseError } from "pg";
import FlightService from "../service/flight.service.js";
import { ApiError, ApiResponse } from "../utils/api.utils.js";
import {
    flightResponse,
    flightsResponse,
    flightSummaryResponse,
    flightsSummaryResponse,
    flightSearchResponse,
    flightsSearchResponse,
} from "../utils/flight.utils.js";

class FlightController {
    flightService;
    constructor() {
        this.flightService = new FlightService();
    }

    createFlightController = async (req, res) => {
        try {
            const {
                airplane_id,
                source_airport_id,
                destination_airport_id,
                departure_time,
                arrival_time,
                price,
                booked_seats,
            } = req.body;

            if (
                !airplane_id ||
                !source_airport_id ||
                !destination_airport_id ||
                !departure_time ||
                !arrival_time ||
                !price
            ) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(
                            false,
                            "Insufficient input data. Required: airplane_id, source_airport_id, destination_airport_id, departure_time, arrival_time, price",
                            400
                        )
                    );
            }

            const flight = {
                airplane_id,
                source_airport_id,
                destination_airport_id,
                departure_time,
                arrival_time,
                price,
                booked_seats: booked_seats || 0,
            };

            const newFlight = await this.flightService.createFlightService(
                flight
            );
            return res.json(
                new ApiResponse(
                    true,
                    "New flight created successfully.",
                    200,
                    flightResponse(newFlight)
                )
            );
        } catch (error) {
            if (error instanceof ApiError || error instanceof DatabaseError) {
                if (error instanceof DatabaseError) {
                    return res.status(500).json(new ApiError(error.message));
                }
                res.status(error.status).json(error.toJSON());
                return;
            }
            res.status(500).json("Something went wrong");
        }
    };

    getAllFlightsController = async (req, res) => {
        try {
            const flights = await this.flightService.getAllFlightsService();
            return res.json(
                new ApiResponse(
                    true,
                    "All flights fetched successfully",
                    200,
                    flightsResponse(flights)
                )
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getFlightByIdController = async (req, res) => {
        try {
            const { id } = req.params;
            const flight = await this.flightService.getFlightByIdService(id);
            return res.json(
                new ApiResponse(
                    true,
                    "Flight fetched successfully",
                    200,
                    flightResponse(flight)
                )
            );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(new ApiError(error.message));
        }
    };

    getFlightByFlightNumberController = async (req, res) => {
        try {
            const { flightNumber } = req.params;
            const flight =
                await this.flightService.getFlightByFlightNumberService(
                    flightNumber
                );
            return res.json(
                new ApiResponse(
                    true,
                    "Flight fetched successfully",
                    200,
                    flightResponse(flight)
                )
            );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(new ApiError(error.message));
        }
    };

    deleteFlightController = async (req, res) => {
        try {
            const { id } = req.params;
            const flight = await this.flightService.deleteFlightService(id);
            return res.json(
                new ApiResponse(
                    true,
                    "Flight deleted successfully",
                    200,
                    flight
                )
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getFlightsByDestinationAndSourceCityIdController = async (req, res) => {
        try {
            // const { source, destination, date } = req.body;
            const { source, destination, date } = req.query;

            if (!source || !destination || !date) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(
                            false,
                            "Both source and destination cities are required",
                            400
                        )
                    );
            }

            const flights =
                await this.flightService.getFlightsBySourceAndDestinationCityIdService(
                    source,
                    destination,
                    date
                );
            return res.json(
                new ApiResponse(
                    true,
                    "Flights fetched successfully",
                    200,
                    flights
                )
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateFlightSourceAirportController = async (req, res) => {
        try {
            const { id } = req.params;
            const { newAirportId } = req.body;

            if (!id || !newAirportId) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(
                            false,
                            "Both flight id and new airport id are required",
                            400
                        )
                    );
            }

            const flight =
                await this.flightService.updateFlightSourceAirportService(
                    id,
                    newAirportId
                );
            return res.json(
                new ApiResponse(
                    true,
                    "Flight source airport updated successfully",
                    200,
                    flightResponse(flight)
                )
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateFlightDestinationAirportController = async (req, res) => {
        try {
            const { id } = req.params;
            const { newAirportId } = req.body;

            if (!id || !newAirportId) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(
                            false,
                            "Both flight id and new airport id are required",
                            400
                        )
                    );
            }

            const flight =
                await this.flightService.updateFlightDestinationAirportService(
                    id,
                    newAirportId
                );
            return res.json(
                new ApiResponse(
                    true,
                    "Flight destination airport updated successfully",
                    200,
                    flightResponse(flight)
                )
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateFlightAirplaneController = async (req, res) => {
        try {
            const { id } = req.params;
            const { airplaneId } = req.body;

            if (!id || !airplaneId) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(
                            false,
                            "Both flight id and airplane id are required",
                            400
                        )
                    );
            }

            const flight = await this.flightService.updateFlightAirplaneService(
                id,
                airplaneId
            );
            return res.json(
                new ApiResponse(
                    true,
                    "Flight airplane updated successfully",
                    200,
                    flightResponse(flight)
                )
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateFlightPriceController = async (req, res) => {
        try {
            const { id } = req.params;
            const { newPrice } = req.body;

            if (!id || !newPrice) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(
                            false,
                            "Both flight id and new price are required",
                            400
                        )
                    );
            }

            const flight = await this.flightService.updateFlightPriceService(
                id,
                newPrice
            );
            return res.json(
                new ApiResponse(
                    true,
                    "Flight price updated successfully",
                    200,
                    flightResponse(flight)
                )
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };
}

export default FlightController;
