import mongoose, { Schema } from "mongoose";

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
  },
  { timestamps: true }
);

export const Exam = mongoose.model("Exam", examSchema);
