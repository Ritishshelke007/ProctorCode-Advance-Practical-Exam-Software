import mongoose, { Schema } from "mongoose";
import { Student } from "./student.model.js";

const examSchema = new Schema(
  {
    course: {
      type: String,
      required: true,
    },
    examCode: {
      type: String,
      required: true,
      unique: true,
    },
    examDate: {
      type: String,
      required: true,
    },

    examTime: {
      type: String,
      required: true,
    },
    examDuration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    problemStatements: [
      {
        type: String,
        required: true,
      },
    ],
    enableVideoProctoring: {
      type: Boolean,
      required: true,
    },
    enableAudioProctoring: {
      type: Boolean,
      required: true,
    },
    monitoringData: [
      {
        student: {
          type: Schema.Types.ObjectId,
          ref: "Student",
        },
        startTime: {
          type: Date,
        },
        tabChangeCount: {
          type: Number,
          default: 0,
        },
        copyPasteCount: {
          type: Number,
          default: 0,
        },
        hardwareDetectedCount: {
          type: Number,
          default: 0,
        },
        noFaceDetectedCount: {
          type: Number,
          default: 0,
        },
        submissionStatus: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

examSchema.pre("save", async function (next) {
  try {
    const students = await Student.find({
      year: this.year,
      division: this.division,
      batch: this.batch,
    });

    const monitoringData = students.map((student) => {
      return {
        student: student._id,
        startTime: null,
        tabChangeCount: 0,
        copyPasteCount: 0,
        hardwareDetectedCount: 0,
        noFaceDetectedCount: 0,
        submissionStatus: false,
      };
    });

    this.monitoringData = monitoringData;
    next();
  } catch (error) {
    next(error);
  }
});

export const Exam = mongoose.model("Exam", examSchema);
