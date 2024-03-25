import { Exam } from "../models/exam.model.js";

const createExam = async (req, res) => {
  try {
    const formData = req.body;

    const {
      course,
      examCode,
      examDate,
      examTime,
      year,
      division,
      batch,
      problemStatements,
      enableVideoProctoring,
      enableAudioProctoring,
    } = formData;

    const exam = await Exam.create({
      course,
      examCode,
      examDate,
      examTime,
      year,
      division,
      batch,
      problemStatements,
      enableVideoProctoring,
      enableAudioProctoring,
    });

    if (exam) {
      return res.status(200).json({ message: "Exam created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createExam };
