import express, { Router } from "express";
import { addCourse } from "../controllers/course.controller.js";

const router = Router();

router.route("/add-course").post(addCourse);

export default router;
