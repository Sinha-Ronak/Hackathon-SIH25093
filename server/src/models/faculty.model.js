import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  salaryPaid: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }
);

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
