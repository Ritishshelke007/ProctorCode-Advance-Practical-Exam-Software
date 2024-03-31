import { Exam } from "../models/exam.model.js";
import { Faculty } from "../models/faculty.model.js";

const createExam = async (req, res) => {
  try {
    const { _id } = req.user;
    const formData = req.body;

    const {
      course,
      examCode,
      examDate,
      examTime,
      examDuration,
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
      examDuration,
      year,
      division,
      batch,
      problemStatements,
      enableVideoProctoring,
      enableAudioProctoring,
    });

    await Faculty.updateOne(
      { _id },
      { $push: { exams: exam._id } },
      { new: true }
    );

    const populatedExam = await Exam.populate(exam, {
      path: "monitoringData.student",
      select: "_id email name prn",
    });

    if (populatedExam) {
      return res.status(200).json({
        message: "Exam created successfully",
        exam: populatedExam,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getExams = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await Faculty.findById(_id).populate("exams");

    const exams = user.exams.map((exam) => {
      const examData = exam.toObject();
      const createdAtDate = new Date(examData.createdAt);
      // Format date to desired format
      const formattedDate = createdAtDate.toLocaleString("hi-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      // Return the exam object with formatted date
      return {
        ...examData,
        createdAt: createdAtDate,
        formattedCreatedAt: formattedDate,
      };
    });

    if (exams) {
      return res.status(200).json({ exams });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getExamByCode = async (req, res) => {
  try {
    const examCode = req.params["examcode"];

    const exam = await Exam.findOne({ examCode });

    // if (exam) {
    return res.status(200).json({ exam });
    // }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Backend Controller

const getExamDetailsByCode = async (req, res) => {
  try {
    const examCode = req.params["examcode"];

    // Fetch exam details based on exam code
    const exam = await Exam.findOne({ examCode }).populate(
      "monitoringData.student"
    );

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Format the response data as needed
    const formattedExam = {
      course: exam.course,
      examCode: exam.examCode,
      // Include other exam details as needed
      monitoringData: exam.monitoringData.map((data) => ({
        studentName: data.student.name,
        studentPrn: data.student.prn,
        startTime: data.startTime,
        tabChangeCount: data.tabChangeCount,
        copyPasteCount: data.copyPasteCount,
        hardwareDetectedCount: data.hardwareDetectedCount,
        noFaceDetectedCount: data.noFaceDetectedCount,
        submissionStatus: data.submissionStatus,
      })),
    };

    return res.status(200).json({ exam: formattedExam });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createExam, getExams, getExamByCode, getExamDetailsByCode };
