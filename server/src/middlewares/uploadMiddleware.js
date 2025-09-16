import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hackathon_docs",        
    resource_type: "auto",           
    allowed_formats: ["pdf"],        
  },
});

const upload = multer({ storage });

export default upload;
