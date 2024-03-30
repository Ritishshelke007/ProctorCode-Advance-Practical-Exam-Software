import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
import authRoutes from "./routes/auth.routes.js";
app.use("/auth", authRoutes);

import courseRoutes from "./routes/course.routes.js";
app.use("/course", courseRoutes);

import examRoutes from "./routes/exam.routes.js";
app.use("/exam", examRoutes);

export default app;
