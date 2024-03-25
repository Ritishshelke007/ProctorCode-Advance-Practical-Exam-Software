import { Course } from "../models/course.model.js";

const addCourse = async (req, res) => {
  try {
    const { courseName, courseCode, maximumMarks } = req.body;

    const course = await Course.create({
      courseName,
      courseCode,
      maximumMarks,
    });

    if (course) {
      return res
        .status(201)
        .json({ message: "Course added successfully", course });
    } else {
      return res.status(400).json({ message: "Error in adding new course" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { addCourse };
