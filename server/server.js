import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRouter from "./routers/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect to database and start server
(async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log("Ready To Go !!!!!");
    });
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
})();

// Routes
app.use("/api/v1/auth", authRouter);
