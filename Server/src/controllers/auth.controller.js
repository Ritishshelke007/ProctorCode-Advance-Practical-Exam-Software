import { Student } from "../models/student.model.js";
import { Faculty } from "../models/faculty.model.js";
import { formatDataToSend } from "../../middlewares/auth.middleware.js";

const registerStudent = async (req, res) => {
  try {
    const { email, name, prn, year, division, batch, password } = req.body;

    const studentExists = await Student.exists({ email });
    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = await Student.create({
      email,
      name,
      prn,
      year,
      division,
      batch,
      password,
    });

    res
      .status(201)
      .json({ message: "Student registered successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerFaculty = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const facultyExists = await Faculty.exists({ email });
    if (facultyExists) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    const faculty = await Faculty.create({
      email,
      name,
      password,
    });

    res
      .status(201)
      .json({ message: "Faculty registered successfully", faculty });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json(formatDataToSend(student));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(400).json({ message: "Faculty not found" });
    }

    if (faculty.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json(formatDataToSend(faculty));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { registerStudent, registerFaculty, loginStudent, loginFaculty };
