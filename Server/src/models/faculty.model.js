import mongoose, { Schema } from "mongoose";

const facultySchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "please add the faculty email"],
    },
    name: {
      type: String,
      required: [true, "please add the faculty name"],
    },
    password: {
      type: String,
      required: [true, "please add the faculty password"],
    },
  },
  { timestamps: true }
);

export const Faculty = mongoose.model("Faculty", facultySchema);
