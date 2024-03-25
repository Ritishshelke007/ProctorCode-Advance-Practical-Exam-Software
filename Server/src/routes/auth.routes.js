import { Router } from "express";
import {
  registerStudent,
  registerFaculty,
  loginStudent,
  loginFaculty,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/student/signup").post(registerStudent);
router.route("/faculty/signup").post(registerFaculty);

router.route("/student/login").post(loginStudent);
router.route("/faculty/login").post(loginFaculty);

export default router;
