import Student from "../models/student.model.js";
import Faculty from "../models/faculty.model.js";

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