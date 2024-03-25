import { Router } from "express";
import { createExam } from "../controllers/exam.controller.js";

const router = Router();

router.route("/create-exam").post(createExam);

export default router;
