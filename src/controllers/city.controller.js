import { DatabaseError } from "pg";
import CityService from "../service/city.service.js";
import { ApiError, ApiResponse } from "../utils/api.utils.js";

class CityController {
    cityService;
    constructor() {
        this.cityService = new CityService();
    }

    createCityController = async (req, res) => {
        try {
            const { name, country_id } = req.body;

            if (!name || !country_id) {
                return new ApiResponse(false, `Unsufficient input data`);
            }
            const city = { name, country_id };
            const newCity = await this.cityService.createCityService(city);
            return res.json(
                new ApiResponse(true, "New City created.", 200, newCity)
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

    getAllCityController = async (req, res) => {
        try {
            const cities = await this.cityService.getAllCitiesService();
            return res.json(
                new ApiResponse(true, "All cities fetched", 200, cities)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    deleteCityController = async (req, res) => {
        try {
            const { id } = req.params;
            const city = await this.cityService.deleteCityService(id);
            return res.json(new ApiResponse(true, "city deleted", 200, city));
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getCityByIdController = async (req, res) => {
        try {
            const { id } = req.params;
            const city = await this.cityService.getCityByIdService(id);
            return res.json(new ApiResponse(true, "city fetched", 200, city));
        } catch (error) {
            return res.status(error.status).json(new ApiError(error.message));
        }
    };

    getCityByNameController = async (req, res) => {
        try {
            const { name } = req.params;
            const city = await this.cityService.getCityByNameService(name);
            return res.json(new ApiResponse(true, "city fetched", 200, city));
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateCityNameController = async (req, res) => {
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
            const city = await this.cityService.updateCityNameService(id, name);

            return res.json(new ApiResponse(true, "city name updated", city));
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };
}

export default CityController;
