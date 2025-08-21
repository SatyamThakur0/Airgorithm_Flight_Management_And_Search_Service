import { ApiError, ApiResponse } from "../utils/api.utils.js";
import { getPool } from "../utils/dbPool.utils.js";

class CityRepository {
    pool = getPool();
    constructor() {}

    createCity = async (city) => {
        // OK
        const client = await this.pool.connect();
        try {
            const query = `INSERT INTO city (name, country_id)
            VALUES ($1, $2) RETURNING *`;
            const result = await client.query(query, [
                city.name,
                city.country_id,
            ]);
            const newCountry = result.rows[0];
            return newCountry;
        } finally {
            client.release();
        }
    };

    deleteCity = async (id) => {
        // OK
        const client = await this.pool.connect();
        try {
            const query = `DELETE FROM city WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id]);
            const deletedCity = result.rows[0];
            if (!deletedCity) {
                throw new ApiResponse(false, "city not found", 404);
            }
            return deletedCity;
        } finally {
            await client.release();
        }
    };

    getCityById = async (id) => {
        // OK
        const client = await this.pool.connect();
        try {
            const query = `SELECT c.id AS city_id,
                           c.name AS city_name,
                           c.created_at AS city_created_at,
                           c.updated_at AS city_updated_at,
                           co.id AS country_id,
                           co.name AS country_name,
                           co.code AS country_code,
                           co.created_at AS country_created_at,
                           co.updated_at AS country_updated_at
                           FROM city c
                           INNER JOIN country co
                           ON c.country_id = co.id
                           WHERE c.id = $1`;
            const result = await client.query(query, [id]);
            const city = result.rows[0];
            if (city == undefined) {
                throw new ApiError(`City with id : ${id} not found.`, 400);
            }
            const cityResponse = {
                id: city.city_id,
                name: city.city_name,
                created_at: city.city_created_at,
                updated_at: city.city_updated_at,
                country: {
                    id: city.country_id,
                    name: city.country_name,
                    code: city.country_code,
                    created_at: city.country_created_at,
                    updated_at: city.country_updated_at,
                },
            };
            return cityResponse;
        } finally {
            client.release();
        }
    };

    getCityByName = async (name) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT c.id AS city_id,
                           c.name AS city_name,
                           c.created_at AS city_created_at,
                           c.updated_at AS city_updated_at,
                           co.id AS country_id,
                           co.name AS country_name,
                           co.code AS country_code,
                           co.created_at AS country_created_at,
                           co.updated_at AS country_updated_at
                           FROM city c
                           INNER JOIN country co
                           ON c.country_id = co.id
                           WHERE c.name = $1`;
            const result = await client.query(query, [name]);
            const city = result.rows[0];
            if (city === undefined) {
                // throw new ApiError(`City with name ${name} not found`, 400);
                return "";
            }
            const cityResponse = {
                id: city.city_id,
                name: city.city_name,
                created_at: city.city_created_at,
                updated_at: city.city_updated_at,
                country: {
                    id: city.country_id,
                    name: city.country_name,
                    code: city.country_code,
                    created_at: city.country_created_at,
                    updated_at: city.country_updated_at,
                },
            };
            return cityResponse;
        } finally {
            await client.release();
        }
    };

    updateCityName = async (id, name) => {
        // OK
        const client = await this.pool.connect();
        try {
            const query = "UPDATE city SET name = $1 WHERE id = $2 RETURNING *";
            const result = await client.query(query, [name, id]);
            const city = result.rows[0];
            if (!city) {
                throw new ApiResponse(false, "city not found", 404);
            }
            return city;
        } finally {
            await client.release();
        }
    };

    getAllCities = async () => {
        // OK
        const client = await this.pool.connect();
        try {
            const query = `SELECT c.id AS city_id,
                           c.name AS city_name,
                           c.created_at AS city_created_at,
                           c.updated_at AS city_updated_at,
                           co.id AS country_id,
                           co.name AS country_name,
                           co.code AS country_code,
                           co.created_at AS country_created_at,
                           co.updated_at AS country_updated_at
                           FROM city c
                           INNER JOIN country co
                           ON c.country_id = co.id
                           `;
            const result = await client.query(query);

            const cities = result.rows.map((row) => {
                return {
                    id: row.city_id,
                    name: row.city_name,
                    created_at: row.city_created_at,
                    updated_at: row.city_updated_at,
                    country: {
                        id: row.country_id,
                        name: row.country_name,
                        code: row.country_code,
                        created_at: row.country_created_at,
                        updated_at: row.country_updated_at,
                    },
                };
            });
            return cities;
        } finally {
            client.release();
        }
    };

    getCitiesByNameRE = async (name) => {
        const client = await this.pool.connect();
        console.log("Api hitted ", name);

        try {
            const query = `SELECT c.id, c.name, con.code
                           FROM city c
                           INNER JOIN country con
                           ON c.country_id = con.id
                           WHERE c.name ILIKE $1`;

            const result = await client.query(query, [`%${name}%`]);
            return result.rows;
        } finally {
            await client.release();
        }
    };
}

export default CityRepository;
