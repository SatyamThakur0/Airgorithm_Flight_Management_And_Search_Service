import jwt from "jsonwebtoken";
import { ApiError, ApiResponse } from "../utils/api.utils.js";
import { config } from "dotenv";
config();

class AdminAuthMiddleware {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET;
    }

    authenticate = (req, res, next) => {
        const token =
            req.cookies.token ||
            (req.headers && req.headers["Authorization"].split(" ")[1]);

        if (!token) {
            return res.status(401).json(new ApiError("No token provided", 401));
        }

        try {
            const decoded = jwt.verify(token, this.jwtSecret);
            console.log("middleware : ", decoded);
            if (decoded.role != "SUPERVISOR") {
                return res.json(new ApiResponse("false", "Unauthorized.", 401));
            }
            req.user = decoded;
            next();
        } catch (err) {
            console.log(err.stack);

            return res
                .status(401)
                .json(new ApiError("Invalid or expired token", 401, err.stack));
        }
    };
}

export default new AdminAuthMiddleware();
