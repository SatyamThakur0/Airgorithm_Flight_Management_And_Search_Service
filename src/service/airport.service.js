import AirportRepository from "../repository/airport.repository.js";

class AirportService {
    airportRepository;
    constructor() {
        this.airportRepository = new AirportRepository();
    }
    createAirportService = async (airport) => {
        return this.airportRepository.createAirport(airport);
    };
    deleteAirportService = async (id) => {
        return this.airportRepository.deleteAirport(id);
    };
    getAirportByIdService = async (id) => {
        return this.airportRepository.getAirportById(id);
    };
    getAirportByNameService = async (name) => {
        return this.airportRepository.getAirportByName(name);
    };
    getAirportByCodeService = async (code) => {
        return this.airportRepository.getAirportByCode(code);
    };
    getAllAirportsService = async () => {
        return this.airportRepository.getAllAirports();
    };
    getAirportsInCityByCityNameService = async (name) => {
        return this.airportRepository.getAirportsInCityByCityName(name);
    };
    getAirportsByCityNameREService = async (name) => {
        return this.airportRepository.getAirportsByCityNameRE(name);
    };
    getAirportsInCityByCityIdService = async (id) => {
        return this.airportRepository.getAirportsInCityByCityId(id);
    };
    updateAirportNameService = async (id, name) => {
        return this.airportRepository.updateAirportName(id, name);
    };
    updateAirportCodeService = async (id, code) => {
        return this.airportRepository.updateAirportCode(id, code);
    };
}
export default AirportService;
