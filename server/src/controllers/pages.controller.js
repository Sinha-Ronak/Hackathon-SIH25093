import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";
import Faculty from "../models/faculty.model.js";

// Admin profile for portal
export const adminProfileController = async (req, res) => {
	try {
		// Assuming authenticateAdmin middleware sets req.admin
		const adminId = req.admin?._id;
		if (!adminId) return res.status(401).json({ message: "Unauthorized" });
		const admin = await Admin.findById(adminId).select('-password -__v');
		if (!admin) return res.status(404).json({ message: "Admin not found" });
		res.json({
			name: admin.name,
			email: admin.email,
			role: "Admin",
			phone: admin.contactNumber,
			adminId: admin.adminId,
			joinedOn: admin.createdAt
		});
	} catch (err) {
		res.status(500).json({ message: "Error fetching admin profile" });
	}
};

// Search student by enrollmentNumber
export const searchStudentController = async (req, res) => {
	const { id } = req.query;
	try {
		const student = await Student.findOne({ enrollmentNumber: id }).select('-password -__v -_id -createdAt -updatedAt');
		if (!student) return res.status(404).json({ message: "Student not found" });
		res.json(student);
	} catch (err) {
		res.status(500).json({ message: "Error searching student" });
	}
};

// Search faculty by employeeId
export const searchFacultyController = async (req, res) => {
	const { id } = req.query;
	try {
		const faculty = await Faculty.findOne({ employeeId: id }).select('-password -__v -_id -createdAt -updatedAt');
		if (!faculty) return res.status(404).json({ message: "Faculty not found" });
		res.json(faculty);
	} catch (err) {
		res.status(500).json({ message: "Error searching faculty" });
	}
};

export const adminPanelController = async (req , res) => {
	// For pending fees and salaries, assuming fields exist (e.g., feePaid, salaryPaid)
	try {
		const studentCount = await Student.countDocuments();
		const facultyCount = await Faculty.countDocuments();
		// Example: pending fees (students with feePaid: false)
		const pendingFeesCount = await Student.countDocuments({ feePaid: false });
		// Example: pending salaries (faculties with salaryPaid: false)
		const pendingSalariesCount = await Faculty.countDocuments({ salaryPaid: false });
		res.json({
			students: studentCount,
			faculties: facultyCount,
			pendingFees: pendingFeesCount,
			pendingSalaries: pendingSalariesCount
		});
	} catch (err) {
		res.status(500).json({ message: "Error fetching stats" });
	}
}

// Faculty profile for portal
export const facultyProfileController = async (req, res) => {
	try {
		// Assuming authenticateFaculty middleware sets req.faculty
		const facultyId = req.faculty?._id;
		if (!facultyId) return res.status(401).json({ message: "Unauthorized" });
		const faculty = await Faculty.findById(facultyId).select('-password -__v');
		if (!faculty) return res.status(404).json({ message: "Faculty not found" });
		res.json({
			name: faculty.name,
			email: faculty.email,
			department: faculty.department,
			role: "Faculty",
			phone: faculty.contactNumber,
			employeeId: faculty.employeeId,
			joinedOn: faculty.createdAt
		});
	} catch (err) {
		res.status(500).json({ message: "Error fetching faculty profile" });
	}
};