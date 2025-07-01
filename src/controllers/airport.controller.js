import { DatabaseError } from "pg";
import AirportService from "../service/airport.service.js";
import { ApiError, ApiResponse } from "../utils/api.utils.js";

class AirportController {
    airportService;
    constructor() {
        this.airportService = new AirportService();
    }

    createAirportController = async (req, res) => {
        try {
            const { name, code, city_id } = req.body;

            if (!name || !code || !city_id) {
                return new ApiResponse(false, `Unsufficient input data`);
            }
            const airport = { name, code, city_id };
            const newAirport = await this.airportService.createAirportService(
                airport
            );
            return res.json(
                new ApiResponse(true, "New Airport created.", 200, newAirport)
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

    getAllAirportController = async (req, res) => {
        try {
            const airports = await this.airportService.getAllAirportsService();
            return res.json(
                new ApiResponse(true, "All airports fetched", 200, airports)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    deleteAirportController = async (req, res) => {
        try {
            const { id } = req.params;
            const airport = await this.airportService.deleteAirportService(id);
            return res.json(
                new ApiResponse(true, "airport deleted", 200, airport)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getAirportByIdController = async (req, res) => {
        try {
            const { id } = req.params;
            const airport = await this.airportService.getAirportByIdService(id);
            return res.json(
                new ApiResponse(true, "airport fetched", 200, airport)
            );
        } catch (error) {
            return res.status(error.status).json(new ApiError(error.message));
        }
    };

    getAirportByCodeController = async (req, res) => {
        try {
            const { code } = req.params;
            const airport = await this.airportService.getAirportByCodeService(
                code
            );
            return res.json(
                new ApiResponse(true, "airport fetched", 200, airport)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getAirportByNameController = async (req, res) => {
        try {
            const { name } = req.params;
            const airport = await this.airportService.getAirportByNameService(
                name
            );
            return res.json(
                new ApiResponse(true, "airport fetched", 200, airport)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateAirportNameController = async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!id || !name) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(false, "both id and name required", 400)
                    );
            }
            const airport = await this.airportService.updateAirportNameService(
                id,
                name
            );

            return res.json(
                new ApiResponse(true, "airport name updated", airport)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateAirportCodeController = async (req, res) => {
        try {
            const { id } = req.params;
            const { code } = req.body;

            if (!id || !code) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(false, "both id and code required", 400)
                    );
            }
            const airport = await this.airportService.updateAirportCodeService(
                id,
                code
            );

            return res.json(
                new ApiResponse(true, "airport code updated", 200, airport)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getAirportsInCityByCityNameController = async (req, res) => {
        try {
            const { name } = req.params;
            if (!name) {
                return res
                    .status(400)
                    .json(new ApiResponse(false, "name is required", 400));
            }

            const airports =
                await this.airportService.getAirportsInCityByCityNameService(
                    name
                );
            return res.json(
                new ApiResponse(true, "airports fetched", 200, airports)
            );
        } catch (error) {
            return res.status(500).json(new ApiError(error.message));
        }
    };

    getAirportsInCityByCityIdController = async (req, res) => {
        try {
            const { id } = req.params;
            const airports =
                await this.airportService.getAirportsInCityByCityIdService(id);
            return res.json(
                new ApiResponse(true, "airports fetched", 200, airports)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };
}

export default AirportController;
