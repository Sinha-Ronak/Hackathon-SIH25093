import express from "express";
import { uploadDocument, approveDocument, rejectDocument, getPendingDocs, } from "../controllers/docs.controller.js";
import { authenticateStudent, authenticateFaculty } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Student uploads directly to Cloudinary
router.post("/upload", authenticateStudent, upload.single("file"), uploadDocument);

// Faculty/Admin endpoints
router.get("/pending", authenticateFaculty, getPendingDocs);
router.put("/:docId/approve", authenticateFaculty, approveDocument);
router.put("/:docId/reject", authenticateFaculty, rejectDocument);

export default router;
