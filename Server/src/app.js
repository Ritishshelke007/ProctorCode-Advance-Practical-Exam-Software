import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
import authRoutes from "./routes/auth.routes.js";
app.use("/auth", authRoutes);

import courseRoutes from "./routes/course.routes.js";
app.use("/course", courseRoutes);

export default app;
