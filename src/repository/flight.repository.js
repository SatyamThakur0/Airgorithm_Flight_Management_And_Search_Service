import { ApiError, ApiResponse } from "../utils/api.utils.js";
import { getPool } from "../utils/dbPool.utils.js";

class FlightRepository {
    pool = getPool();
    constructor() {}

    createFlight = async (flight) => {
        const client = await this.pool.connect();
        try {
            const query = `INSERT INTO flight (airplane_id, source_airport_id, destination_airport_id, departure_time, arrival_time, price, booked_seats)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
            const result = await client.query(query, [
                flight.airplane_id,
                flight.source_airport_id,
                flight.destination_airport_id,
                flight.departure_time,
                flight.arrival_time,
                flight.price,
                flight.booked_seats,
            ]);
            const newFlight = this.getFlightById(result.rows[0].id);
            return newFlight;
        } finally {
            client.release();
        }
    };

    deleteFlight = async (id) => {
        const client = await this.pool.connect();

        try {
            const query = `DELETE FROM flight WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id]);
            const deletedFlight = result.rows[0];
            if (!deletedFlight) {
                throw new ApiResponse(false, "flight not found", 404);
            }
            return deletedFlight;
        } finally {
            await client.release();
        }
    };

    getFlightById = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT f.*,
                           sa.id as source_airport_id,
                           sa.name as source_airport_name,
                           sa.code as source_airport_code,
                           sa.created_at as source_airport_created_at,
                           sa.updated_at as source_airport_updated_at,
                           da.id as destination_airport_id,
                           da.name as destination_airport_name,
                           da.code as destination_airport_code,
                           da.created_at as destination_airport_created_at,
                           da.updated_at as destination_airport_updated_at,
                           ap.id as airplane_id,
                           ap.name as airplane_name,
                           ap.code as airplane_code,
                           ap.capacity as airplane_capacity,
                           ap.created_at as airplane_created_at,
                           ap.updated_at as airplane_updated_at,
                           sc.id AS source_city_id,
                           sc.name AS source_city_name,
                           sc.created_at AS source_city_created_at,
                           sc.updated_at AS source_city_updated_at,
                           scon.id AS source_country_id,
                           scon.name AS source_country_name,
                           scon.code AS source_country_code,
                           scon.created_at AS source_country_created_at,
                           scon.updated_at AS source_country_updated_at,
                           dc.id AS destination_city_id,
                           dc.name AS destination_city_name,
                           dc.created_at AS destination_city_created_at,
                           dc.updated_at AS destination_city_updated_at,
                           dcon.id AS destination_country_id,
                           dcon.name AS destination_country_name,
                           dcon.code AS destination_country_code,
                           dcon.created_at AS destination_country_created_at,
                           dcon.updated_at AS destination_country_updated_at
                           FROM flight f
                           INNER JOIN airport sa ON f.source_airport_id = sa.id
                           INNER JOIN airport da ON f.destination_airport_id = da.id
                           INNER JOIN city sc ON sa.city_id = sc.id
                           INNER JOIN city dc ON da.city_id = dc.id
                           INNER JOIN country scon ON sc.country_id = scon.id
                           INNER JOIN country dcon ON dc.country_id = dcon.id
                           INNER JOIN airplane ap ON f.airplane_id = ap.id
                           WHERE f.id = $1;`;
            const result = await client.query(query, [id]);
            const flight = result.rows[0];
            if (flight == undefined) {
                throw new ApiError(`Flight with id : ${id} not found.`, 400);
            }
            return flight;
        } finally {
            client.release();
        }
    };

    getFlightByFlightNumber = async (flightNumber) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT f.*,
                           sa.id as source_airport_id,
                           sa.name as source_airport_name,
                           sa.code as source_airport_code,
                           sa.created_at as source_airport_created_at,
                           sa.updated_at as source_airport_updated_at,
                           da.id as destination_airport_id,
                           da.name as destination_airport_name,
                           da.code as destination_airport_code,
                           da.created_at as destination_airport_created_at,
                           da.updated_at as destination_airport_updated_at,
                           ap.id as airplane_id,
                           ap.name as airplane_name,
                           ap.code as airplane_code,
                           ap.capacity as airplane_capacity,
                           ap.created_at as airplane_created_at,
                           ap.updated_at as airplane_updated_at,
                           sc.id AS source_city_id,
                           sc.name AS source_city_name,
                           sc.created_at AS source_city_created_at,
                           sc.updated_at AS source_city_updated_at,
                           scon.id AS source_country_id,
                           scon.name AS source_country_name,
                           scon.code AS source_country_code,
                           scon.created_at AS source_country_created_at,
                           scon.updated_at AS source_country_updated_at,
                           dc.id AS destination_city_id,
                           dc.name AS destination_city_name,
                           dc.created_at AS destination_city_created_at,
                           dc.updated_at AS destination_city_updated_at,
                           dcon.id AS destination_country_id,
                           dcon.name AS destination_country_name,
                           dcon.code AS destination_country_code,
                           dcon.created_at AS destination_country_created_at,
                           dcon.updated_at AS destination_country_updated_at
                           FROM flight f
                           INNER JOIN airport sa ON f.source_airport_id = sa.id
                           INNER JOIN airport da ON f.destination_airport_id = da.id
                           INNER JOIN city sc ON sa.city_id = sc.id
                           INNER JOIN city dc ON da.city_id = dc.id
                           INNER JOIN country scon ON sc.country_id = scon.id
                           INNER JOIN country dcon ON dc.country_id = dcon.id
                           INNER JOIN airplane ap ON f.airplane_id = ap.id
                           WHERE f.flight_number = $1;`;
            const result = await client.query(query, [flightNumber]);
            const flight = result.rows[0];
            if (flight === undefined) {
                throw new ApiError(
                    `Flight with flight number ${flightNumber} not found`,
                    400
                );
            }
            return flight;
        } finally {
            await client.release();
        }
    };

    getFlightsByCityIdAndDepartureDate = async (id, date) => {
        const client = await this.pool.connect();
        try {
            const query = `
            SELECT f.id, sc.id as source_city_id
            FROM flight f
            INNER JOIN airport sa on sa.id = f.source_airport_id
            INNER JOIN city sc on sc.id = sa.city_id
            WHERE sc.id = $1
            AND TO_CHAR(f.departure_time, 'YYYY-MM-DD') = $2;`;
            const result = await client.query(query, [id, date]);
            const flights = result.rows;
            if (!flights) {
                throw new ApiError(`Flight not found`, 400);
            }

            return flights;
        } finally {
            await client.release();
        }
    };

    getFlightsWithinTimeWindowByAirportId = async (
        airportId,
        fromTime,
        toTime
    ) => {
        const client = await this.pool.connect();
        try {
            const query = `
            SELECT f.*, 
            sc.id as source_city_id,
            sc.name as source_city_name,
            dc.id as destination_city_id,
            dc.name as destination_city_name
            FROM flight f
            INNER JOIN airport sa on sa.id = f.source_airport_id
            INNER JOIN city sc on sc.id = sa.city_id
            INNER JOIN airport da on da.id = f.destination_airport_id
            INNER JOIN city dc on dc.id = da.city_id
            WHERE f.source_airport_id = $1`;
            const result = await client.query(query, [
                airportId,
            ]);
            const flights = result.rows;
            return flights;
        } finally {
            await client.release();
        }
    };

    updateFlightSourceAirport = async (id, newAirport_id) => {
        const client = await this.pool.connect();
        try {
            const query = `
            UPDATE flight
            SET source_airport_id = $1
            WHERE id = $2
            RETURNING *;`;
            const result = await client.query(query, [newAirport_id, id]);
            const flight = this.getFlightById(result.rows[0].id);
            if (!flight) {
                throw new ApiResponse(false, "Flight not found", 404);
            }
            return flight;
        } finally {
            client.release();
        }
    };

    updateFlightDestinationAirport = async (id, newAirport_id) => {
        const client = await this.pool.connect();
        try {
            const query = `
            UPDATE flight
            SET destination_airport_id = $1
            WHERE id = $2
            RETURNING *;`;
            const result = await client.query(query, [newAirport_id, id]);
            const flight = this.getFlightById(result.rows[0].id);
            if (!flight) {
                throw new ApiResponse(false, "Flight not found", 404);
            }
            return flight;
        } finally {
            await client.release();
        }
    };

    updateFlightAirplane = async (flight_id, airplane_id) => {
        const client = await this.pool.connect();
        try {
            const query = `
            UPDATE flight 
            SET airplane_id = $1
            WHERE id = $2
            RETURNING *;`;
            const result = await client.query(query, [airplane_id, flight_id]);
            const flight = this.getFlightById(result.rows[0].id);
            if (!flight) {
                return new ApiResponse(false, "Flight not found", 404);
            }
            return flight;
        } finally {
            await client.release();
        }
    };

    updateFlightPrice = async (id, newPrice) => {
        const client = await this.pool.connect();
        try {
            const query =
                "UPDATE flight SET price = $1 WHERE id = $2 RETURNING *";
            const result = await client.query(query, [newPrice, id]);
            const flight = this.getFlightById(result.rows[0].id);
            if (!flight) {
                throw new ApiResponse(false, "Flight not found", 404);
            }
            return flight;
        } finally {
            await client.release();
        }
    };

    getAllFlights = async () => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT f.*,
                           sa.id as source_airport_id,
                           sa.name as source_airport_name,
                           sa.code as source_airport_code,
                           sa.created_at as source_airport_created_at,
                           sa.updated_at as source_airport_updated_at,
                           da.id as destination_airport_id,
                           da.name as destination_airport_name,
                           da.code as destination_airport_code,
                           da.created_at as destination_airport_created_at,
                           da.updated_at as destination_airport_updated_at,
                           ap.id as airplane_id,
                           ap.name as airplane_name,
                           ap.code as airplane_code,
                           ap.capacity as airplane_capacity,
                           ap.created_at as airplane_created_at,
                           ap.updated_at as airplane_updated_at,
                           sc.id AS source_city_id,
                           sc.name AS source_city_name,
                           sc.created_at AS source_city_created_at,
                           sc.updated_at AS source_city_updated_at,
                           scon.id AS source_country_id,
                           scon.name AS source_country_name,
                           scon.code AS source_country_code,
                           scon.created_at AS source_country_created_at,
                           scon.updated_at AS source_country_updated_at,
                           dc.id AS destination_city_id,
                           dc.name AS destination_city_name,
                           dc.created_at AS destination_city_created_at,
                           dc.updated_at AS destination_city_updated_at,
                           dcon.id AS destination_country_id,
                           dcon.name AS destination_country_name,
                           dcon.code AS destination_country_code,
                           dcon.created_at AS destination_country_created_at,
                           dcon.updated_at AS destination_country_updated_at
                           FROM flight f
                           INNER JOIN airport sa ON f.source_airport_id = sa.id
                           INNER JOIN airport da ON f.destination_airport_id = da.id
                           INNER JOIN city sc ON sa.city_id = sc.id
                           INNER JOIN city dc ON da.city_id = dc.id
                           INNER JOIN country scon ON sc.country_id = scon.id
                           INNER JOIN country dcon ON dc.country_id = dcon.id
                           INNER JOIN airplane ap ON f.airplane_id = ap.id;`;
            const result = await client.query(query);

            const flights = result.rows;
            return flights;
        } finally {
            client.release();
        }
    };
}
export default FlightRepository;
