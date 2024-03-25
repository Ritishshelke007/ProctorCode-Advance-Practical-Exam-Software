import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    prn: {
      type: String,
      required: true,
      unique: true,
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
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
