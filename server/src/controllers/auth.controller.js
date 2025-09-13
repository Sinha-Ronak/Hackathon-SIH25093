import Student from "../models/student.model.js"
import bcrypt from "bcrypt";
import { genEnrollmentNumber, genEmployeeId, genAdminId } from "../utils/generateUid.js";
import { generateJWT } from "../utils/generateJWT.js";
import Faculty from "../models/faculty.model.js";
import Admin from "../models/admin.model.js";

export const studentSignup = async (req, res) => {
  const { name, email, password, year, department, course, contactNumber } = req.body;
  try {
    if (!name || !email || !password || !year || !department || !course || !contactNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const ifEmailExists = await Student.findOne({ email });
    if (ifEmailExists) {
        return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    if (contactNumber.toString().length !== 10) {
        return res.status(400).json({ message: "Contact number must be 10 digits long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEnrollmentNumber = genEnrollmentNumber(year, department, course);

    const newStudent = new Student({
        name,
        email,
        password: hashedPassword,
        enrollmentNumber: newEnrollmentNumber,
        year,
        department,
        course,
        contactNumber,
    })
    if (newStudent) {
        const token = generateJWT(newStudent._id, res);
        await newStudent.save();
        res.status(201).json({ 
            message: "Signup successful",
            student: { id: newStudent._id, name: newStudent.name, email: newStudent.email, enrollmentNumber: newStudent.enrollmentNumber }
         });
    }
    else{
        res.status(400).json({ message: "Invalid Student data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateJWT(student._id, res);
    res.status(201).json({ message: "Login successful", student: { id: student._id, name: student.name, email: student.email, enrollmentNumber: student.enrollmentNumber } });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const studentLogout = (req, res) => {
   try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const facultySignup = async (req, res) => {
    const { name, email, password, department, contactNumber } = req.body;
  try {
    if (!name || !email || !password || !department || !contactNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const ifEmailExists = await Faculty.findOne({ email });
    if (ifEmailExists) {
        return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    if (contactNumber.toString().length !== 10) {
        return res.status(400).json({ message: "Contact number must be 10 digits long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployeeId = genEmployeeId(department);

    const newFaculty = new Faculty({
        name,
        email,
        password: hashedPassword,
        employeeId: newEmployeeId,
        department,
        contactNumber,
    })
    if (newFaculty) {
        const token = generateJWT(newFaculty._id, res);
        await newFaculty.save();

        res.status(201).json({ 
            message: "Signup successful",
            faculty: { id: newFaculty._id, name: newFaculty.name, email: newFaculty.email, employeeId: newFaculty.employeeId }
         });
    }
    else{
        res.status(400).json({ message: "Invalid Faculty data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }   
}

export const facultyLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateJWT(faculty._id, res);
    res.status(200).json({ message: "Login successful", faculty: { id: faculty._id, name: faculty.name, email: faculty.email, employeeId: faculty.employeeId } });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const facultyLogout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }  
}

export const adminSignup = async (req, res) => {
    const { name, email, password, department, contactNumber } = req.body;
  try {
    if (!name || !email || !password || !department || !contactNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const ifEmailExists = await Admin.findOne({ email });
    if (ifEmailExists) {
        return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    if (contactNumber.toString().length !== 10) {
        return res.status(400).json({ message: "Contact number must be 10 digits long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdminId = genAdminId(department);

    const newAdmin = new Admin({
        name,
        email,
        password: hashedPassword,
        adminId: newAdminId,
        department,
        contactNumber,
    })
    if (newAdmin) {
        const token = generateJWT(newAdmin._id, res);
        await newAdmin.save();
        res.status(201).json({ 
            message: "Signup successful",
            admin: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email, adminId: newAdmin.adminId }
         });
    }
    else{
        res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }   
}

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateJWT(admin._id, res);
    res.status(200).json({ message: "Login successful", admin: { id: admin._id, name: admin.name, email: admin.email, adminId: admin.adminId } });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const adminLogout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }  
}