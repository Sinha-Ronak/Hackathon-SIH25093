import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { authenticateAdmin } from '../middlewares/auth.middleware.js';
import { adminPanelController } from '../controllers/pages.controller.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/admin/signup', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/Admin/admin_signup.html"));
});

router.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/Admin/admin_login.html"));
});

router.get('/faculty/signup', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/Faculty/faculty_signup.html"));
});

router.get('/faculty/login', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/Faculty/faculty_login.html"));
});

router.get('/student/signup', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/Student/student_signup.html"));
});

router.get('/student/login', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/Student/student_login.html"));
});


// API endpoint for admin dashboard
router.get('/admin/dashboard', adminPanelController);

export default router;