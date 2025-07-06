import CountryRepository from "../repository/country.repository.js";
import FlightRepository from "../repository/flight.repository.js";
import { flightSearchResponse, JourneyTriplet } from "../utils/flight.utils.js";

class FlightService {
    flightRepository;
    countryRepository;
    constructor() {
        this.flightRepository = new FlightRepository();
        this.countryRepository = new CountryRepository();
    }

    createFlightService = async (flight) => {
        return this.flightRepository.createFlight(flight);
    };

    getFlightByIdService = async (id) => {
        return this.flightRepository.getFlightById(id);
    };

    getFlightByFlightNumberService = async (flightNumber) => {
        return this.flightRepository.getFlightByFlightNumber(flightNumber);
    };

    deleteFlightService = async (id) => {
        return this.flightRepository.deleteFlight(id);
    };

    getAllFlightsService = async () => {
        return this.flightRepository.getAllFlights();
    };

    getFlightsWithinTimeWindowByAirportIdService = async (
        id,
        fromTime,
        toTime
    ) => {
        return this.flightRepository.getFlightsWithinTimeWindowByAirportId(
            id,
            fromTime,
            toTime
        );
    };

    getFlightsByCityIdAndDepartureDateService = async (
        source_city_id,
        departure_date
    ) => {
        return this.flightRepository.getFlightsByCityIdAndDepartureDate(
            source_city_id,
            departure_date
        );
    };

    

    updateFlightSourceAirportService = async (id, newAirportId) => {
        return this.flightRepository.updateFlightSourceAirport(
            id,
            newAirportId
        );
    };

    updateFlightDestinationAirportService = async (id, newAirportId) => {
        return this.flightRepository.updateFlightDestinationAirport(
            id,
            newAirportId
        );
    };

    updateFlightAirplaneService = async (flightId, airplaneId) => {
        return this.flightRepository.updateFlightAirplane(flightId, airplaneId);
    };

    updateFlightPriceService = async (id, newPrice) => {
        return this.flightRepository.updateFlightPrice(id, newPrice);
    };
}

export default FlightService;
