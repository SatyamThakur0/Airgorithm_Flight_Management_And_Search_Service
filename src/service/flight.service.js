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

    getFlightsBySourceAndDestinationCityIdService = async (
        source_city_id,
        destination_city_id,
        departure_date
    ) => {
        let STOPS = 1;
        const MIN_LAYOVER = 30 * 60 * 1000;
        let MAX_LAYOVER = 180 * 60 * 1000;
        const MAX_INTERNATIONAL_LAYOVER = 10 * 60 * 60 * 1000;
        const allJourney = []; // [ [f1, f2], [f3, f4], [f5, f6] ]
        const queue = []; // JourneyTriplet((set), [f1, f2, f3 ...], stops)

        const flights =
            await this.flightRepository.getFlightsByCityIdAndDepartureDate(
                source_city_id,
                departure_date
            );

        const sourceCountry = await this.countryRepository.getCountryByCityId(
            source_city_id
        );
        const destinationCountry =
            await this.countryRepository.getCountryByCityId(
                destination_city_id
            );
        if (sourceCountry !== destinationCountry) {
            STOPS = 3;
            MAX_LAYOVER = MAX_INTERNATIONAL_LAYOVER;
        }

        for (const flight of flights) {
            const set = new Set();
            set.add(flight.city_id);
            queue.push(new JourneyTriplet(set, [flight.id], STOPS));
        }

        while (queue.length > 0) {
            const currJourney = queue.shift();

            const visited = currJourney.set;
            const flights = currJourney.flights;
            const remainingStops = currJourney.stops;
            const lastFlightId = flights.at(-1); // [(set), [f1, f2,...]]

            const lastFlight = await this.getFlightByIdService(lastFlightId);

            if (
                lastFlight.destination_city_id === destination_city_id ||
                remainingStops === 0
            ) {
                if (lastFlight.destination_city_id === destination_city_id)
                    allJourney.push(flights);
                continue;
            }

            const minDepTime = new Date(
                new Date(lastFlight.arrival_time).getTime() + MIN_LAYOVER
            ).toISOString();
            const maxDepTime = new Date(
                new Date(lastFlight.arrival_time).getTime() +
                    MAX_INTERNATIONAL_LAYOVER
            ).toISOString();

            const nextFlights =
                await this.flightRepository.getFlightsWithinTimeWindowByAirportId(
                    lastFlight.destination_airport_id,
                    minDepTime,
                    maxDepTime
                );

            for (const flight of nextFlights) {
                if (!visited.has(flight.destination_city_id)) {
                    const newFlights = [...flights, flight.id];
                    const newSet = new Set(visited);
                    newSet.add(flight.destination_city_id);
                    queue.push(
                        new JourneyTriplet(
                            newSet,
                            newFlights,
                            remainingStops - 1
                        )
                    );
                }
            }
        }
        let detailedAllJourney = [];

        for (const journey of allJourney) {
            let detailedJourney = [];
            for (const flightId of journey) {
                const res = await this.getFlightByIdService(flightId);
                const detailedFlight = flightSearchResponse(res);
                detailedJourney.push(detailedFlight);
            }
            detailedAllJourney.push(detailedJourney);
        }

        return detailedAllJourney;
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
