import { DatabaseError } from "pg";
import CountryService from "../service/country.service.js";
import { ApiError, ApiResponse } from "../utils/api.utils.js";

class CountryController {
    countryService;
    constructor() {
        this.countryService = new CountryService();
    }

    createCountryController = async (req, res) => {
        try {
            const { name, code } = req.body;
            if (!name || !code) {
                return new ApiResponse(false, `Unsufficient input data`);
            }
            const country = { name, code };
            const newCountry = await this.countryService.createCountryService(
                country
            );
            return res.json(
                new ApiResponse(true, "New Country created.", 200, newCountry)
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

    getAllCountryController = async (req, res) => {
        try {
            const countries =
                await this.countryService.getAllCountriesService();
            return res.json(
                new ApiResponse(true, "All country fetched", countries)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    deleteCountryController = async (req, res) => {
        try {
            const { id } = req.params;
            const country = await this.countryService.deleteCountryService(id);
            return res.json(new ApiResponse(true, "country deleted", country));
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getCountryByIdController = async (req, res) => {
        try {
            const { id } = req.params;
            const country = await this.countryService.getCountryByIdService(id);
            return res.json(new ApiResponse(true, "country fetched", country));
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getCountryByNameController = async (req, res) => {
        try {
            const { name } = req.params;
            const country = await this.countryService.getCountryByNameService(
                name
            );
            return res.json(new ApiResponse(true, "country fetched", country));
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getCountryByCodeController = async (req, res) => {
        try {
            const { code } = req.params;
            const country = await this.countryService.getCountryByCodeService(
                code
            );
            return res.json(new ApiResponse(true, "country fetched", country));
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateCountryNameController = async (req, res) => {
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
            const country = await this.countryService.updateCountryNameService(
                id,
                name
            );

            return res.json(new ApiResponse(true, "country updated", country));
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    updateCountryCodeController = async (req, res) => {
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
            const country = await this.countryService.updateCountryCodeService(
                id,
                code
            );
            return res.json(new ApiResponse(true, "country updated", country));
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };

    getCountriesByNameREController = async (req, res) => {
        try {
            const { name } = req.params;
            const countries =
                await this.countryService.getCountriesByNameREService(name);
            return res.json(
                new ApiResponse(true, "countries fetched", 200, countries)
            );
        } catch (error) {
            return res.json(new ApiError(error.message));
        }
    };
}

export default CountryController;
