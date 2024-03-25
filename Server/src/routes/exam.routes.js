import { Router } from "express";
import { createExam , getExams } from "../controllers/exam.controller.js";

const router = Router();

router.route("/create-exam").post(createExam);
router.route("/get-exams").get(getExams);

export default router;
