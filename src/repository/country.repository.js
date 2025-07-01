import { getPool } from "../utils/dbPool.utils.js";
import { ApiError } from "../utils/api.utils.js";

class CountryRepository {
    pool = getPool();
    constructor() {}

    createCountry = async (country) => {
        const client = await this.pool.connect();
        try {
            const query = `INSERT INTO country (name, code)
            VALUES ($1, $2) RETURNING *`;

            const result = await client.query(query, [
                country.name,
                country.code,
            ]);
            const newCountry = result.rows[0];

            return newCountry;
        } finally {
            await client.release();
        }
    };

    deleteCountry = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `DELETE FROM country WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id]);
            const deletedCountry = result.rows[0];

            if (deletedCountry == undefined) {
                throw new ApiError("Country not found.");
            }
            return deletedCountry;
        } finally {
            await client.release();
        }
    };

    getAllCountries = async () => {
        const client = await this.pool.connect();
        try {
            const query = "SELECT * FROM country";
            const result = await client.query(query);
            const countries = result.rows;
            return countries;
        } finally {
            await client.release();
        }
    };

    getCountryById = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM country WHERE id = $1`;
            const result = await client.query(query, [id]);
            const newCountry = result.rows[0];
            return newCountry;
        } finally {
            await client.release();
        }
    };

    getCountryByName = async (name) => {
        const client = await this.pool.connect();
        try {
            const query = "SELECT * FROM country WHERE name = $1";
            const result = await client.query(query, [name]);
            const country = result.rows[0];
            if (country === undefined) {
                throw new ApiError(404, `Country with name ${name} not found`);
            }
            return country;
        } finally {
            await client.release();
        }
    };

    getCountryByCode = async (code) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM country WHERE code = $1`;
            const result = await client.query(query, [code]);
            const country = result.rows[0];
            if (country == undefined) {
                throw new ApiError(500, `Country with name ${name} not found`);
            }
            return country;
        } finally {
            await client.release();
        }
    };
    updateCountryName = async (id, newName) => {
        const client = await this.pool.connect();
        try {
            const query = `UPDATE country SET name = $2 WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id, newName]);
            const updatedCountry = result.rows[0];
            if (updatedCountry == undefined) {
                throw new ApiError(500, `Country with id : ${id} not found`);
            }
            return updatedCountry;
        } finally {
            await client.release();
        }
    };
    updateCountryCode = async (id, newCode) => {
        const client = await this.pool.connect();
        try {
            const query = `UPDATE country SET code = $2 WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id, newCode]);
            const updatedCountry = result.rows[0];
            if (updatedCountry == undefined) {
                throw new ApiError(500, `Country with id : ${id} not found`);
            }
            return updatedCountry;
        } finally {
            await client.release();
        }
    };
}

export default CountryRepository;
