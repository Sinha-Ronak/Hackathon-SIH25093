import jwt from "jsonwebtoken"
import Admin from "../models/admin.model.js"
import Faculty from "../models/faculty.model.js"
import Student from "../models/student.model.js"

export const authenticateStudent = async (req , res , next) => {
    const token = req.cookies.token;
    try {
        if(!token) {
            return res.status(401).json({message: "Unauthorized User" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const student = await Student.findById(decoded.id);

        if (!student) {
            return res.status(401).json({ message: "Unauthorized User" });
        }

        req.student = student;

        next();
    } catch (error) {
        console.log("Error in student authentication middleware:", error);
        return res.status(401).json({ message: "Unauthorized User" });
    }

}

export const authenticateFaculty = async (req , res , next) => {
    const token = req.cookies.token;
    try {
        if(!token) {
            return res.status(401).json({message: "Unauthorized User" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const faculty = await Faculty.findById(decoded.id);

        if (!faculty) {
            return res.status(401).json({ message: "Unauthorized User" });
        }

        req.faculty = faculty;

        next();
    } catch (error) {
        console.log("Error in faculty authentication middleware:", error);
        return res.status(401).json({ message: "Unauthorized User" });
    }

}

export const authenticateAdmin = async (req , res , next) => {
    const token = req.cookies.token;
    try {
        if(!token) {
            return res.status(401).json({message: "Unauthorized User" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({ message: "Unauthorized User" });
        }

        req.admin = admin;

        next();
    } catch (error) {
        console.log("Error in admin authentication middleware:", error);
        return res.status(401).json({ message: "Unauthorized User" });
    }

}