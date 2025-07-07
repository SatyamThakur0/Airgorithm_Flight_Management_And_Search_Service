import { getPool } from "../utils/dbPool.utils.js";
import { ApiError } from "../utils/api.utils.js";

class UserRepository {
    pool = getPool();
    constructor() {}

    findUserByEmail = async (email) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM "user" WHERE email = $1`;
            const result = await client.query(query, [email]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };

    createUser = async (user) => {
        const client = await this.pool.connect();
        try {
            const query = `INSERT INTO "user" (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *`;
            const result = await client.query(query, [
                user.name,
                user.email,
                user.password,
                user.phone,
            ]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };
}

export default UserRepository;
