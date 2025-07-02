import AirplaneRepository from "../repository/airplane.repository.js";

class AirplaneService {
    airplaneRepository;
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
    }
    createAirplaneService = async (airplane) => {
        return this.airplaneRepository.createAirplane(airplane);
    };
    deleteAirplaneService = async (id) => {
        return this.airplaneRepository.deleteAirplane(id);
    };
    getAirplaneByIdService = async (id) => {
        return this.airplaneRepository.getAirplaneById(id);
    };
    getAirplaneByNameService = async (name) => {
        return this.airplaneRepository.getAirplaneByName(name);
    };
    getAirplaneByCodeService = async (code) => {
        return this.airplaneRepository.getAirplaneByCode(code);
    };
    getAllAirplanesService = async () => {
        return this.airplaneRepository.getAllAirplanes();
    };
    updateAirplaneNameService = async (id, name) => {
        return this.airplaneRepository.updateAirplaneName(id, name);
    };
    updateAirplaneCodeService = async (id, code) => {
        return this.airplaneRepository.updateAirplaneCode(id, code);
    };
    updateAirplaneCapacityService = async (id, capacity) => {
        return this.airplaneRepository.updateAirplaneCapacity(id, capacity);
    };
}
export default AirplaneService;
