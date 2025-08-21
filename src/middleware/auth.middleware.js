import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api.utils.js";
import { config } from "dotenv";
config();

class AuthMiddleware {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
    }

    authenticate = (req, res, next) => {
        const authHeader = req.headers["Authorization"] || req.cookies.token;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json(new ApiError("No token provided", 401));
        }
        const token = authHeader.split(" ")[1];
        console.log(token);

        try {
            const decoded = jwt.verify(token, this.jwtSecret);
            req.user = decoded;
            next();
        } catch (err) {
            return res
                .status(401)
                .json(new ApiError("Invalid or expired token", 401));
        }
    };
}

export default AuthMiddleware;
