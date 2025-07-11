import { ApiError, ApiResponse } from "../utils/api.utils.js";
import { getPool } from "../utils/dbPool.utils.js";
import { AirportResponse } from "../utils/airport.utils.js";

class AirportRepository {
    pool = getPool();
    constructor() {}

    createAirport = async (airport) => {
        const client = await this.pool.connect();
        try {
            const query = `INSERT INTO airport (name, code, city_id)
            VALUES ($1, $2, $3) RETURNING *`;
            const result = await client.query(query, [
                airport.name,
                airport.code,
                airport.city_id,
            ]);
            const newAirport = result.rows[0];
            return newAirport;
        } finally {
            client.release();
        }
    };

    deleteAirport = async (id) => {
        // OK
        const client = await this.pool.connect();
        try {
            const query = `DELETE FROM airport WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id]);
            const deletedAirport = result.rows[0];
            if (!deletedAirport) {
                throw new ApiResponse(false, "airport not found", 404);
            }
            return deletedAirport;
        } finally {
            await client.release();
        }
    };

    getAirportById = async (id) => {
        // OK
        const client = await this.pool.connect();
        try {
            const query = `SELECT 
                           a.id as airport_id,
                           a.name as airport_name,
                           a.code as airport_code,
                           c.id AS city_id,
                           c.name AS city_name,
                           c.created_at AS city_created_at,
                           c.updated_at AS city_updated_at,
                           co.id AS country_id,
                           co.name AS country_name,
                           co.code AS country_code,
                           co.created_at AS country_created_at,
                           co.updated_at AS country_updated_at
                           FROM airport a
                           INNER JOIN city c ON a.city_id = c.id
                           INNER JOIN country co ON c.country_id = co.id
                           WHERE a.id = $1`;
            const result = await client.query(query, [id]);
            const airport = result.rows[0];
            if (airport == undefined) {
                throw new ApiError(`Airport with id : ${id} not found.`, 400);
            }
            return AirportResponse(airport);
        } finally {
            client.release();
        }
    };

    getAirportByName = async (name) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT 
                           a.id as airport_id,
                           a.name as airport_name,
                           a.code as airport_code,
                           c.id AS city_id,
                           c.name AS city_name,
                           c.created_at AS city_created_at,
                           c.updated_at AS city_updated_at,
                           co.id AS country_id,
                           co.name AS country_name,
                           co.code AS country_code,
                           co.created_at AS country_created_at,
                           co.updated_at AS country_updated_at
                           FROM airport a
                           INNER JOIN city c ON a.city_id = c.id
                           INNER JOIN country co ON c.country_id = co.id
                           WHERE a.name = $1`;
            const result = await client.query(query, [name]);
            const airport = result.rows[0];
            if (airport === undefined) {
                throw new ApiError(`Airport with name ${name} not found`, 400);
            }
            return AirportResponse(airport);
        } finally {
            await client.release();
        }
    };

    getAirportByCode = async (code) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT 
                           a.id as airport_id,
                           a.name as airport_name,
                           a.code as airport_code,
                           c.id AS city_id,
                           c.name AS city_name,
                           c.created_at AS city_created_at,
                           c.updated_at AS city_updated_at,
                           co.id AS country_id,
                           co.name AS country_name,
                           co.code AS country_code,
                           co.created_at AS country_created_at,
                           co.updated_at AS country_updated_at
                           FROM airport a
                           INNER JOIN city c ON a.city_id = c.id
                           INNER JOIN country co ON c.country_id = co.id
                           WHERE a.code = $1`;
            const result = await client.query(query, [code]);
            const airport = result.rows[0];
            if (airport === undefined) {
                throw new ApiError(`Airport with name ${code} not found`, 400);
            }
            return AirportResponse(airport);
        } finally {
            await client.release();
        }
    };

    getAirportsInCityByCityName = async (name) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT 
                           a.id as airport_id,
                           a.name as airport_name,
                           a.code as airport_code,
                           a.created_at, a.updated_at,
                           c.id AS city_id,
                           c.name AS city_name,
                           c.created_at AS city_created_at,
                           c.updated_at AS city_updated_at,
                           co.id AS country_id,
                           co.name AS country_name,
                           co.code AS country_code,
                           co.created_at AS country_created_at,
                           co.updated_at AS country_updated_at
                           FROM airport a
                           INNER JOIN city c ON a.city_id = c.id
                           INNER JOIN country co ON c.country_id = co.id
                           WHERE c.name = $1`;

            const result = await client.query(query, [name]);
            const airports = result.rows.map((row) => AirportResponse(row));
            return airports;
        } finally {
            await client.release();
        }
    };

    getAirportsByCityNameRE = async (name) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT 
                           a.id as airport_id,
                           a.name as airport_name,
                           a.code as airport_code,
                           a.created_at, a.updated_at,
                           c.id AS city_id,
                           c.name AS city_name,
                           c.created_at AS city_created_at,
                           c.updated_at AS city_updated_at,
                           co.id AS country_id,
                           co.name AS country_name,
                           co.code AS country_code,
                           co.created_at AS country_created_at,
                           co.updated_at AS country_updated_at
                           FROM airport a
                           INNER JOIN city c ON a.city_id = c.id
                           INNER JOIN country co ON c.country_id = co.id
                           WHERE c.name ILIKE $1`;

            const result = await client.query(query, [`%${name}%`]);
            const airports = result.rows.map((row) => AirportResponse(row));
            return airports;
        } finally {
            await client.release();
        }
    };

    getAirportsInCityByCityId = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT 
                           a.id as airport_id,
                           a.name as airport_name,
                           a.code as airport_code,
                           c.id AS city_id,
                           c.name AS city_name,
                           c.created_at AS city_created_at,
                           c.updated_at AS city_updated_at,
                           co.id AS country_id,
                           co.name AS country_name,
                           co.code AS country_code,
                           co.created_at AS country_created_at,
                           co.updated_at AS country_updated_at
                           FROM airport a
                           INNER JOIN city c ON a.city_id = c.id
                           INNER JOIN country co ON c.country_id = co.id
                           WHERE c.id = $1`;

            const result = await client.query(query, [id]);
            const airports = result.rows.map((row) => AirportResponse(row));
            return airports;
        } finally {
            await client.release();
        }
    };

    updateAirportName = async (id, name) => {
        // OK
        const client = await this.pool.connect();
        try {
            const query =
                "UPDATE airport SET name = $1 WHERE id = $2 RETURNING *";
            const result = await client.query(query, [name, id]);
            const airport = result.rows[0];
            if (!airport) {
                throw new ApiResponse(false, "Airport not found", 404);
            }
            return airport;
        } finally {
            await client.release();
        }
    };

    updateAirportCode = async (id, code) => {
        // OK
        const client = await this.pool.connect();
        try {
            const query =
                "UPDATE airport SET code = $1 WHERE id = $2 RETURNING *";
            const result = await client.query(query, [code, id]);
            const airport = result.rows[0];
            if (!airport) {
                throw new ApiResponse(false, "Airport not found", 404);
            }
            return airport;
        } finally {
            await client.release();
        }
    };

    getAllAirports = async () => {
        // OK
        const client = await this.pool.connect();
        try {
            const query = `SELECT 
                           a.id as airport_id,
                           a.name as airport_name,
                           a.code as airport_code,
                           c.id AS city_id,
                           c.name AS city_name,
                           c.created_at AS city_created_at,
                           c.updated_at AS city_updated_at,
                           co.id AS country_id,
                           co.name AS country_name,
                           co.code AS country_code,
                           co.created_at AS country_created_at,
                           co.updated_at AS country_updated_at
                           FROM airport a
                           INNER JOIN city c ON a.city_id = c.id
                           INNER JOIN country co ON c.country_id = co.id;
                           `;
            const result = await client.query(query);

            const airports = result.rows.map((row) => AirportResponse(row));
            return airports;
        } finally {
            client.release();
        }
    };
}

export default AirportRepository;
