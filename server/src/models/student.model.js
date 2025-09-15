import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
  enrollmentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  feePaid: {
    type: Boolean,
    default: false,
  },
  studentPoints: { 
    type: Number, default: 0 
  },  
  badges: [{ type: String }], 
}, { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student; 