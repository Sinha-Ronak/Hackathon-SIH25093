import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
  adminId: {
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
}, { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;