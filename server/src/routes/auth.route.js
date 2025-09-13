import express from 'express';
import { studentSignup , studentLogin , studentLogout, facultySignup, facultyLogin, facultyLogout, adminSignup, adminLogin, adminLogout  } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/student/signup', studentSignup);
router.post('/student/login', studentLogin);
router.post('/student/logout', studentLogout);

router.post('/faculty/signup', facultySignup);
router.post('/faculty/login', facultyLogin);
router.post('/faculty/logout', facultyLogout);

router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);
router.post('/admin/logout', adminLogout);

export default router;