import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.send("Welcome to the Airline Management Service!");
});

app.use("/flight", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
