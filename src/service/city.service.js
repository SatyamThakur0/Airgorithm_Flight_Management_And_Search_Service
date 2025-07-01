import CityRepository from "../repository/city.repository.js";

class CityService {
    cityRepository;
    constructor() {
        this.cityRepository = new CityRepository();
    }
    createCityService = async (city) => {
        return this.cityRepository.createCity(city);
    };
    getCityByIdService = async (id) => {
        return this.cityRepository.getCityById(id);
    };
    deleteCityService = async (id) => {
        return this.cityRepository.deleteCity(id);
    };
    getAllCitiesService = async () => {
        return this.cityRepository.getAllCities();
    };
    getCityByNameService = async (name) => {
        return this.cityRepository.getCityByName(name);
    };
    updateCityNameService = async (id, name) => {
        return this.cityRepository.updateCityName(id, name);
    };
}
export default CityService;
