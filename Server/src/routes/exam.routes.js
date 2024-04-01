import { Router } from "express";
import {
  createExam,
  getCompletedExams,
  getExamByCode,
  getExamByStudent,
  getExamDetailsByCode,
  getExams,
  getProblemStatementForStudent,
  getMonitoringDataByStudent,
} from "../controllers/exam.controller.js";
import { verifyJWT } from "../middlewares/faculty.auth.middleware.js";

const router = Router();

router.route("/create-exam").post(verifyJWT, createExam);
router.route("/get-exams").get(verifyJWT, getExams);
router.route("/get-exam-by-code/:examcode").get(getExamDetailsByCode);
router.route("/get-completed-exams").get(getCompletedExams);
router.route("/get-exam-by-student").post(getExamByStudent);
router
  .route("/get-ps-for-student/:examId/:studentId")
  .get(getProblemStatementForStudent);
router
  .route("/get-monitoring-data/:examId/:studentId")
  .get(getMonitoringDataByStudent);

export default router;
