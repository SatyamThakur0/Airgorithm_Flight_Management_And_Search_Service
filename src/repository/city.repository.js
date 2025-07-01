import { ApiError } from "../utils/api.utils.js";
import { getPool } from "../utils/dbPool.utils.js";

class CityRepository {
    pool = getPool;
    constructor() {}

    createCity = async (city) => {
        const client = await this.pool.connect();
        try {
            const query = `INSERT INO city (name, country_id)
            VALUES ($1, $2) RETURNING *`;
            const result = await client.query(query, [
                city.name,
                city.country_id,
            ]);
            const newCountry = result.rows[0];
            return newCountry;
        } catch (error) {
        } finally {
            client.release();
        }
    };

    deleteCity = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `DELETE FROM city WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id]);
            return result;
        } catch (error) {
            console.log(error.message);
        } finally {
            await client.release();
        }
    };

    getCityById = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM city WHERE id = $1`;
            const result = await client.query(query, [id]);
            const city = result.rows[0];
            if (city == undefined) {
                return ApiError(500, `City with id : ${id} not found.`);
            }
            return city;
        } catch (error) {
        } finally {
            client.release();
        }
    };

    updateCityName = async (id, name) => {
        const client = await this.pool.connect();
        try {
            const query = "UPDATE city SET name = $1 WHERE id = $2";
            await client.query(query, [name, id]);
            return this.getCityById(id);
        } finally {
            await client.release();
        }
    };

    getAllCities = async () => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT C.*, co.*
            FROM city as c
            INNER JOIN country as co
            ON c.country_id = co.id;`;
            const resullt = await client.query(query);
            const cities = resullt.rows.map((row)=>{

            })
        } catch (error) {
        } finally {
            client.release();
        }
    };
}
