import CountryRepository from "../repository/country.repository.js";
import FlightRepository from "../repository/flight.repository.js";
import {
    flightResponse,
    flightSearchResponse,
    JourneyTriplet,
} from "../utils/flight.utils.js";

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

    createLegFlight = async (flight_cycle_id, index, leg) => {
        return this.flightRepository.createLegFlight(
            flight_cycle_id,
            index,
            leg
        );
    };

    createFlightCycleService = async (data) => {
        try {
            const flight_cycle_payload = {
                airplane_id: data.airplane_id,
                total_days: data.total_days,
                start_date: data.start_date,
            };
            const flight_cycle_id =
                await this.flightRepository.createFlightCycle(
                    flight_cycle_payload
                );

            let leg_flights = [];

            for (let [index, leg] of data.legs.entries()) {
                const leg_flight = await this.createLegFlight(
                    flight_cycle_id,
                    index,
                    leg
                );
                leg_flights.push(leg_flight);
            }

            return leg_flights;
        } catch (error) {
            throw new Error(error.message);
        }
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
        source_airport_id,
        destination_airport_id,
        departure_date
    ) => {
        let STOPS = 1;
        const MIN_LAYOVER = 30 * 60 * 1000;
        let MAX_LAYOVER = 3 * 60 * 60 * 1000;
        const MAX_INTERNATIONAL_LAYOVER = 10 * 60 * 60 * 1000;
        const allJourney = []; // [ [f1, f2], [f3, f4], [f5, f6] ]
        const queue = []; // JourneyTriplet((set), [f1, f2, f3 ...], stops)

        const flights =
            await this.flightRepository.getFlightsByAirportIdAndDepartureDate(
                source_airport_id,
                departure_date
            );

        const sourceCountryId =
            await this.countryRepository.getCountryIdByAirportId(
                source_airport_id
            );
        const destinationCountryId =
            await this.countryRepository.getCountryIdByAirportId(
                destination_airport_id
            );
        if (sourceCountryId !== destinationCountryId) {
            STOPS = 3;
            MAX_LAYOVER = MAX_INTERNATIONAL_LAYOVER;
        }

        for (const flight of flights) {
            const set = new Set();
            set.add(flight.source_city_id);
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
                lastFlight.destination_airport_id === destination_airport_id ||
                remainingStops === 0
            ) {
                if (
                    lastFlight.destination_airport_id === destination_airport_id
                )
                    allJourney.push(flights);
                continue;
            }

            const nextFlights =
                await this.flightRepository.getFlightsWithinTimeWindowByAirportId(
                    lastFlight.destination_airport_id
                );

            for (const flight of nextFlights) {
                const layover =
                    new Date(flight.departure_time).getTime() -
                    new Date(lastFlight.arrival_time).getTime();

                if (
                    layover >= MIN_LAYOVER &&
                    layover <= MAX_LAYOVER &&
                    !visited.has(flight.destination_city_id)
                ) {
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

    updateFlightSeatService = async (id) => {
        return this.flightRepository.updateFlightSeat(id);
    };

    createAutomationFlights = async (date) => {
        //2025-08-14
        try {
            const target_date = new Date(date);
            const allLegs = await this.flightRepository.getAllLegs();

            let flights = [];
            let cyclesMap = new Map();
            for (let leg of allLegs) {
                const departure_time = leg.departure_time;
                const departure_day_offset = leg.departure_day_offset;
                const [dh, dm, ds] = departure_time.split(":").map(Number);
                const departure_timestamp = new Date(
                    target_date.getTime() + departure_day_offset * 86400000 // add days
                );
                departure_timestamp.setHours(dh, dm, ds, 0);

                const arrival_time = leg.arrival_time;
                const arrival_day_offset = leg.arrival_day_offset;
                const [ah, am, as] = arrival_time.split(":").map(Number);
                const arrival_timestamp = new Date(
                    target_date.getTime() + arrival_day_offset * 86400000 // add days
                );
                arrival_timestamp.setHours(ah, am, as, 0);

                const flightPayload = {
                    flight_number: leg.flight_number,
                    airplane_id: leg.airplane_id,
                    source_airport_id: leg.source_airport_id,
                    destination_airport_id: leg.destination_airport_id,
                    departure_time: departure_timestamp,
                    arrival_time: arrival_timestamp,
                    price: leg.price,
                    class_price_factor: leg.class_price_factor,
                    generated_cycle_id: leg.flight_cycle_id,
                    generated_leg_order: leg.leg_order,
                    generated_for_date: target_date,
                };
                if (!cyclesMap.has(leg.flight_cycle_id)) {
                    cyclesMap.set(leg.flight_cycle_id, {
                        airplane_id: leg.airplane_id,
                        total_days: leg.total_days,
                        start_date: leg.start_date,
                        legs: [],
                    });
                }
                cyclesMap.get(leg.flight_cycle_id).legs.push(flightPayload);
            }

            for (let [key, value] of cyclesMap) {
                // console.log("Cycles Map : ", cyclesMap.get(key).legs);
                const start_date = new Date(value.start_date);
                const total_days = value.total_days;
                const days_since_start = Math.floor(
                    new Date(target_date - start_date) / 86400000
                );

                if (days_since_start % total_days == 0) {
                    // console.log("Banegi");
                    for (let flight_entry of value.legs) {
                        // console.log(flight_entry);

                        const flight = await this.flightRepository.createFlight(
                            flight_entry
                        );
                        if (flight) {
                            flights.push(flightResponse(flight));
                        }
                    }
                } else {
                    // console.log("Nahi Banegi");
                }
            }
            return flights;
        } catch (error) {
            console.error(error);
            // continue;
        }
    };
}

export default FlightService;
