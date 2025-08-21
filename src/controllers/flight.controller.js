import { DatabaseError } from "pg";
import FlightService from "../service/flight.service.js";
import { ApiError, ApiResponse } from "../utils/api.utils.js";
import { flightResponse, flightsResponse } from "../utils/flight.utils.js";

class FlightController {
    flightService;
    constructor() {
        this.flightService = new FlightService();
    }

    createFlightController = async (req, res) => {
        try {
            const {
                flight_number,
                airplane_id,
                source_airport_id,
                destination_airport_id,
                departure_time,
                arrival_time,
                price,
                class_price_factor,
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
                flight_number,
                airplane_id,
                source_airport_id,
                destination_airport_id,
                departure_time,
                arrival_time,
                price,
                class_price_factor,
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

    createFlightCycleController = async (req, res) => {
        try {
            const flightsData = req.body;
            if (!flightsData) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(false, "Flights data is required", 400)
                    );
            }
            const allFlights =
                await this.flightService.createFlightCycleService(flightsData);
            return res.json(
                new ApiResponse(
                    true,
                    "Flight cycle created successfully",
                    201,
                    allFlights
                )
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
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
            // console.log(flights);

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

    updateFlightSeatController = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(
                            false,
                            "Both flight id is required",
                            400
                        )
                    );
            }

            const flight = await this.flightService.updateFlightSeatService(id);
            return res.json(
                new ApiResponse(
                    true,
                    "Flight booked seats incremented successfully",
                    200,
                    flightResponse(flight)
                )
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    createAutomationFlightsController = async (req, res) => {
        try {
            const { date } = req.params;
            // console.log("controller reached : ", date);

            const target_date = new Date(date);
            const today = new Date();
            if (!target_date)
                return res.json(
                    new ApiResponse(true, "Target date required!", 400)
                );
            if (target_date < today)
                return res.json(
                    new ApiResponse(
                        false,
                        "Cannot create cycles for past dates.",
                        400
                    )
                );

            const flights = await this.flightService.createAutomationFlights(
                target_date
            );
            return res.json(
                new ApiResponse(
                    true,
                    "Flights created successfully",
                    200,
                    flights
                )
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };
}

export default FlightController;
