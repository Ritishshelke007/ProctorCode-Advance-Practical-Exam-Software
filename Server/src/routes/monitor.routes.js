import { Router } from "express";
import {
  updateActivityCount,
  updateStartTime,
  updateSubmitStatus,
} from "../controllers/monitor.controller.js";

const router = Router();

router.route("/update-count/:examCode/:studentId").post(updateActivityCount);
router.route("/submit-exam/:examCode/:studentId").post(updateSubmitStatus);
router.route("/update-start-time/:examCode/:studentId").post(updateStartTime);

export default router;
