import { ApiError, ApiResponse } from "../utils/api.utils.js";
import { getPool } from "../utils/dbPool.utils.js";

class AirplaneRepository {
    pool = getPool();
    constructor() {}

    createAirplane = async (airplane) => {
        const client = await this.pool.connect();
        try {
            const query = `INSERT INTO airplane (name, code, capacity)
            VALUES ($1, $2, $3) RETURNING *`;
            const result = await client.query(query, [
                airplane.name,
                airplane.code,
                airplane.capacity,
            ]);
            const newAirplane = result.rows[0];
            return newAirplane;
        } finally {
            client.release();
        }
    };

    deleteAirplane = async (id) => {
        const client = await this.pool.connect();

        try {
            const query = `DELETE FROM airplane WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id]);
            const deletedAirplane = result.rows[0];
            if (!deletedAirplane) {
                throw new ApiResponse(false, "airplane not found", 404);
            }
            return deletedAirplane;
        } finally {
            await client.release();
        }
    };

    getAirplaneById = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM airplane WHERE id = $1`;
            const result = await client.query(query, [id]);
            const airplane = result.rows[0];
            if (airplane == undefined) {
                throw new ApiError(`Airplane with id : ${id} not found.`, 400);
            }
            return airplane;
        } finally {
            client.release();
        }
    };

    getAirplaneByName = async (name) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT 
                           *
                           FROM airplane
                           WHERE name = $1`;
            const result = await client.query(query, [name]);
            const airplane = result.rows[0];
            if (airplane === undefined) {
                throw new ApiError(`Airplane with name ${name} not found`, 400);
            }
            return airplane;
        } finally {
            await client.release();
        }
    };

    getAirplaneByCode = async (code) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT 
                           *
                           FROM airplane
                           WHERE code = $1`;
            const result = await client.query(query, [code]);
            const airplane = result.rows[0];
            if (airplane === undefined) {
                throw new ApiError(`Airplane with name ${code} not found`, 400);
            }
            return airplane;
        } finally {
            await client.release();
        }
    };

    updateAirplaneName = async (id, name) => {
        const client = await this.pool.connect();
        try {
            const query =
                "UPDATE airplane SET name = $1 WHERE id = $2 RETURNING *";
            const result = await client.query(query, [name, id]);
            const airplane = result.rows[0];
            if (!airplane) {
                throw new ApiResponse(false, "Airplane not found", 404);
            }
            return airplane;
        } finally {
            await client.release();
        }
    };

    updateAirplaneCode = async (id, code) => {
        const client = await this.pool.connect();
        try {
            const query =
                "UPDATE airplane SET code = $1 WHERE id = $2 RETURNING *";
            const result = await client.query(query, [code, id]);
            const airplane = result.rows[0];
            if (!airplane) {
                throw new ApiResponse(false, "Airplane not found", 404);
            }
            return airplane;
        } finally {
            await client.release();
        }
    };

    updateAirplaneCapacity = async (id, capacity) => {
        const client = await this.pool.connect();
        try {
            const query =
                "UPDATE airplane SET capacity = $1 WHERE id = $2 RETURNING *";
            const result = await client.query(query, [capacity, id]);
            const airplane = result.rows[0];
            if (!airplane) {
                throw new ApiResponse(false, "Airplane not found", 404);
            }
            return airplane;
        } finally {
            await client.release();
        }
    };

    getAllAirplanes = async () => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM airplane`;
            const result = await client.query(query);

            const airplanes = result.rows;
            return airplanes;
        } finally {
            client.release();
        }
    };
}

export default AirplaneRepository;
