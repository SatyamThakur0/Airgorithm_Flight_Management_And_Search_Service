import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.route.js";
import cors from "cors";

dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL;
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [FRONTEND_URL],
        credentials: true,
    })
);

app.get("/", (req, res) => {
    return res.send("Welcome to the Airline Management Service!");
});

app.use("/flight", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
