import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // always a student now
      required: true,
    },
    docType: {
      type: String,
      required: true, // e.g., "Marksheet", "Internship Certificate"
    },
    activityType: {
      type: String,
      enum: ["Seminar", "Conference", "MOOC", "Internship", "Extra-Curricular"],
      required: true,
    },
    fileUrl: {
      type: String,
      required: true, // Cloudinary secure URL
    },
    publicId: {
      type: String,
      required: true, // Cloudinary public ID
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    remarks: {
      type: String,
      default: "",
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", // or Admin
      default: null,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    creditPoints: {
      type: Number,
      default: 0,
    },
    studentPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;
