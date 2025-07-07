import UserRepository from "../repository/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api.utils.js";
import { config } from "dotenv";
config();

class UserService {
    userRepository;
    jwtSecret;
    constructor() {
        this.userRepository = new UserRepository();
        this.jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
    }

    register = async (user) => {
        const existingUser = await this.userRepository.findUserByEmail(
            user.email
        );
        if (existingUser) {
            throw new ApiError("User already exists", 400);
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.userRepository.createUser({
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: hashedPassword,
        });
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            this.jwtSecret,
            { expiresIn: "1d" }
        );
        return {
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
            },
        };
    };

    login = async (email, password) => {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new ApiError("Invalid email or password", 401);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ApiError("Invalid email or password", 401);
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            this.jwtSecret,
            { expiresIn: "1d" }
        );
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        };
    };
}

export default UserService;
