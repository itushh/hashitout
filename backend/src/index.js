import express, { urlencoded } from "express";
import { config } from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import simulationRoutes from "./routes/simulation.route.js";

config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded())

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/simulation", simulationRoutes);

app.get("/", (req, res) => {
  res.send("Server is fucking live..!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
