export const flightResponse = (flight) => {
    return {
        id: flight.id,
        flight_number: flight.flight_number,
        departure_time: flight.departure_time,
        arrival_time: flight.arrival_time,
        price: flight.price,
        booked_seats: flight.booked_seats,
        status: flight.status,
        created_at: flight.created_at,
        updated_at: flight.updated_at,
        airplane: {
            id: flight.airplane_id,
            name: flight.airplane_name,
            code: flight.airplane_code,
            capacity: flight.airplane_capacity,
            created_at: flight.airplane_created_at,
            updated_at: flight.airplane_updated_at,
        },
        source: {
            airport: {
                id: flight.source_airport_id,
                name: flight.source_airport_name,
                code: flight.source_airport_code,
                created_at: flight.source_airport_created_at,
                updated_at: flight.source_airport_updated_at,
            },
            city: {
                id: flight.source_city_id,
                name: flight.source_city_name,
                created_at: flight.source_city_created_at,
                updated_at: flight.source_city_updated_at,
            },
            country: {
                id: flight.source_country_id,
                name: flight.source_country_name,
                code: flight.source_country_code,
                created_at: flight.source_country_created_at,
                updated_at: flight.source_country_updated_at,
            },
        },
        destination: {
            airport: {
                id: flight.destination_airport_id,
                name: flight.destination_airport_name,
                code: flight.destination_airport_code,
                created_at: flight.destination_airport_created_at,
                updated_at: flight.destination_airport_updated_at,
            },
            city: {
                id: flight.destination_city_id,
                name: flight.destination_city_name,
                created_at: flight.destination_city_created_at,
                updated_at: flight.destination_city_updated_at,
            },
            country: {
                id: flight.destination_country_id,
                name: flight.destination_country_name,
                code: flight.destination_country_code,
                created_at: flight.destination_country_created_at,
                updated_at: flight.destination_country_updated_at,
            },
        },
    };
};

export const flightsResponse = (flights) => {
    return flights.map((flight) => flightResponse(flight));
};

export const flightSummaryResponse = (flight) => {
    return {
        id: flight.id,
        flight_number: flight.flight_number,
        departure_time: flight.departure_time,
        arrival_time: flight.arrival_time,
        price: flight.price,
        status: flight.status,
        source: {
            airport_code: flight.source_airport_code,
            city_name: flight.source_city_name,
            country_name: flight.source_country_name,
        },
        destination: {
            airport_code: flight.destination_airport_code,
            city_name: flight.destination_city_name,
            country_name: flight.destination_country_name,
        },
        airplane: {
            name: flight.airplane_name,
            code: flight.airplane_code,
            capacity: flight.airplane_capacity,
        },
    };
};

export const flightsSummaryResponse = (flights) => {
    return flights.map((flight) => flightSummaryResponse(flight));
};

export const flightSearchResponse = (flight) => {
    return {
        id: flight.id,
        flight_number: flight.flight_number,
        departure_time: flight.departure_time,
        arrival_time: flight.arrival_time,
        price: flight.price,
        available_seats: flight.airplane_capacity - flight.booked_seats,
        status: flight.status,
        route: {
            from: {
                airport: flight.source_airport_name,
                airport_code: flight.source_airport_code,
                city: flight.source_city_name,
                country: flight.source_country_name,
            },
            to: {
                airport: flight.destination_airport_name,
                airport_code: flight.destination_airport_code,
                city: flight.destination_city_name,
                country: flight.destination_country_name,
            },
        },
        airplane: {
            name: flight.airplane_name,
            code: flight.airplane_code,
            capacity: flight.airplane_capacity,
        },
    };
};

export const flightsSearchResponse = (flights) => {
    return flights.map((flight) => flightSearchResponse(flight));
};

export class JourneyTriplet {
    set;
    flights;
    stops;
    constructor(set, flights, stops) {
        this.set = set;
        this.flights = flights;
        this.stops = stops;
    }
}
