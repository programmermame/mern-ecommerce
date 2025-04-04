import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getMe", protect, (req, res) => {
    res.json({ message: "My name is Mohammed" })
})

export default router;