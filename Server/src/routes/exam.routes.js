import { Router } from "express";
import {
  createExam,
  getCompletedExams,
  getExamByCode,
  getExamByStudent,
  getExamDetailsByCode,
  getExams,
} from "../controllers/exam.controller.js";
import { verifyJWT } from "../middlewares/faculty.auth.middleware.js";

const router = Router();

router.route("/create-exam").post(verifyJWT, createExam);
router.route("/get-exams").get(verifyJWT, getExams);
router.route("/get-exam-by-code/:examcode").get(getExamDetailsByCode);
router.route("/get-completed-exams").get(getCompletedExams);
router.route("/get-exam-by-student").post(getExamByStudent);

export default router;
