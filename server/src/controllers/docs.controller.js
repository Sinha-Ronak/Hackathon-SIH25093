import Document from "../models/document.model.js";
import Student from "../models/student.model.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { docType, activityType } = req.body;

    const fileUrl = req.file.secure_url || req.file.url || req.file.path;
    const publicId = req.file.filename || req.file.public_id;
    const newDoc = new Document({
      owner: req.student._id,
      docType,
      activityType,
      fileUrl,   // secure Cloudinary URL
      publicId, // Cloudinary public ID
      status: "Pending",
    });

    await newDoc.save();
    res.status(201).json({ message: "Document uploaded successfully", doc: newDoc });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPendingDocs = async (req, res) => {
  try {
    const docs = await Document.find({ status: "Pending" }).populate("owner", "name email enrollmentNumber");
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔹 Approve doc
export const approveDocument = async (req, res) => {
  try {
    const { docId } = req.params;
    const doc = await Document.findById(docId);

    if (!doc) return res.status(404).json({ message: "Document not found" });
    if (doc.status !== "Pending") return res.status(400).json({ message: "Already verified" });

    const { creditPoints, studentPoints } = pointsConfig[doc.activityType] || { creditPoints: 0, studentPoints: 0 };

    doc.status = "Approved";
    doc.creditPoints = creditPoints;
    doc.studentPoints = studentPoints;
    doc.verifiedBy = req.faculty?._id || req.admin?._id;
    doc.verifiedAt = new Date();
    await doc.save();

    await Student.findByIdAndUpdate(doc.owner, { $inc: { totalStudentPoints: studentPoints } });

    res.status(200).json({ message: "Document approved", doc });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔹 Reject doc
export const rejectDocument = async (req, res) => {
  try {
    const { docId } = req.params;
    const { remarks } = req.body;

    const doc = await Document.findById(docId);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    doc.status = "Rejected";
    doc.remarks = remarks || "No remarks provided";
    doc.verifiedBy = req.faculty?._id || req.admin?._id;
    doc.verifiedAt = new Date();
    await doc.save();

    res.status(200).json({ message: "Document rejected", doc });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};