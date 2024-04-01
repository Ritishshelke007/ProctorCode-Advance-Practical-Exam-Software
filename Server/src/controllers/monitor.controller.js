import { Exam } from "../models/exam.model.js";

const updateActivityCount = async (req, res) => {
  try {
    const examCode = req.params["examCode"];
    const studentId = req.params["studentId"];
    const { activity } = req.body;
    console.log(examCode, studentId, activity);

    const exam = await Exam.findOneAndUpdate(
      { examCode, "monitoringData.student": studentId },
      { $inc: { [`monitoringData.$.${activity}`]: 1 } },
      { new: true }
    );
    if (!exam) {
      return res.status(404).json({ message: "Exam or student not found" });
    }

    const studentData = exam.monitoringData.find(
      (data) => data.student == studentId
    );

    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({
      message: "Activity count updated successfully",
      studentData,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateSubmitStatus = async (req, res) => {
  try {
    const examCode = req.params["examCode"];
    const studentId = req.params["studentId"];

    const updatedExam = await Exam.findOneAndUpdate(
      { examCode, "monitoringData.student": studentId },
      { $set: { "monitoringData.$.submissionStatus": true } },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const studentData = updatedExam.monitoringData.find(
      (data) => data.student == studentId
    );

    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res
      .status(200)
      .json({ message: "Exam ended successfully for student", studentData });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateStartTime = async (req, res) => {
  try {
    const examCode = req.params["examCode"];
    const studentId = req.params["studentId"];
    const { startTime } = req.body;

    const updatedExam = await Exam.findOneAndUpdate(
      { examCode, "monitoringData.student": studentId },
      { $set: { "monitoringData.$.startTime": startTime } },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    return res
      .status(200)
      .json({ message: "Exam started successfully for student" });
  } catch (error) {
    console.error("Error starting exam for student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { updateActivityCount, updateSubmitStatus, updateStartTime };
