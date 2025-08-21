import { DatabaseError } from "pg";
import AirplaneService from "../service/airplane.service.js";
import { ApiError, ApiResponse } from "../utils/api.utils.js";

class AirplaneController {
    airplaneService;
    constructor() {
        this.airplaneService = new AirplaneService();
    }

    createAirplaneController = async (req, res) => {

        try {
            const { name, code, seat_distribution } = req.body;

            if (!name || !code || !seat_distribution) {
                return new ApiResponse(false, `Unsufficient input data`);
            }
            const isExist = await this.airplaneService.getAirplaneByCodeService(
                code
            );
            if (isExist)
                return res.json(
                    new ApiResponse(
                        false,
                        `Airplane with code ${code} already exists.`,
                        409
                    )
                );
            const airplane = { name, code, seat_distribution };
            const newAirplane =
                await this.airplaneService.createAirplaneService(airplane);
            return res.json(
                new ApiResponse(true, "New Airplane created.", 200, newAirplane)
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

    getAllAirplaneController = async (req, res) => {
        try {
            const airplanes =
                await this.airplaneService.getAllAirplanesService();
            return res.json(
                new ApiResponse(true, "All airplanes fetched", 200, airplanes)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    deleteAirplaneController = async (req, res) => {
        try {
            const { id } = req.params;
            const airplane = await this.airplaneService.deleteAirplaneService(
                id
            );
            return res.json(
                new ApiResponse(true, "airplane deleted", 200, airplane)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getAirplaneByIdController = async (req, res) => {
        try {
            const { id } = req.params;
            const airplane = await this.airplaneService.getAirplaneByIdService(
                id
            );
            return res.json(
                new ApiResponse(true, "airplane fetched", 200, airplane)
            );
        } catch (error) {
            return res.status(error.status).json(new ApiError(error.message));
        }
    };

    getAirplaneByCodeController = async (req, res) => {
        try {
            const { code } = req.params;
            const airplane =
                await this.airplaneService.getAirplaneByCodeService(code);
            return res.json(
                new ApiResponse(true, "airplane fetched", 200, airplane)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getAirplaneByNameController = async (req, res) => {
        try {
            const { name } = req.params;
            const airplane =
                await this.airplaneService.getAirplaneByNameService(name);
            return res.json(
                new ApiResponse(true, "airplane fetched", 200, airplane)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateAirplaneNameController = async (req, res) => {
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
            const airplane =
                await this.airplaneService.updateAirplaneNameService(id, name);

            return res.json(
                new ApiResponse(true, "airplane name updated", airplane)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateAirplaneCodeController = async (req, res) => {
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
            const airplane =
                await this.airplaneService.updateAirplaneCodeService(id, code);

            return res.json(
                new ApiResponse(true, "airplane code updated", 200, airplane)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getAirplanesByNameREController = async (req, res) => {
        try {
            const { name } = req.params;
            const cities = await this.airplaneService.getAirplanesByNameREService(
                name
            );
            return res.json(
                new ApiResponse(true, "Airplanes fetched", 200, cities)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };
}

export default AirplaneController;
