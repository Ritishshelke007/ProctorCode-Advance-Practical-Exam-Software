import { Router } from "express";
import {
  createExam,
  getExamByCode,
  getExamDetailsByCode,
  getExams,
} from "../controllers/exam.controller.js";
import { verifyJWT } from "../middlewares/faculty.auth.middleware.js";

const router = Router();

router.route("/create-exam").post(verifyJWT, createExam);
router.route("/get-exams").get(verifyJWT, getExams);
router.route("/get-exam-by-code/:examcode").get(getExamDetailsByCode);

export default router;
