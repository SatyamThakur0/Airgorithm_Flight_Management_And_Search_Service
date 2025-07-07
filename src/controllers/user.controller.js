import UserService from "../service/user.service.js";
import { ApiError, ApiResponse } from "../utils/api.utils.js";

class UserController {
    userService;
    constructor() {
        this.userService = new UserService();
    }

    register = async (req, res) => {
        try {
            const { name, email, password, phone } = req.body;
            if (!name || !email || !password) {
                return res
                    .status(400)
                    .json(new ApiError("All fields are required", 400));
            }
            const response = await this.userService.register({
                name,
                email,
                password,
                phone: phone || null,
            });
            return res
                .status(201)
                .cookie("token", response.token)
                .json(
                    new ApiResponse(
                        true,
                        "User registered successfully",
                        201,
                        response.user
                    )
                );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(new ApiError(error.message, error.status || 500));
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json(new ApiError("Email and password are required", 400));
            }
            const result = await this.userService.login(email, password);
            return res
                .status(200)
                .cookie("token", result.token)
                .json(new ApiResponse(true, "Login successful", 200, result));
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(new ApiError(error.message, error.status || 500));
        }
    };
}

export default UserController;
