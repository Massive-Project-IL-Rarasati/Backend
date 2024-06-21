import express from "express";
import { registerUser, loginUser, verifyEmail, logoutUser } from "../controller/authController.js";


const router = express.Router();

router.post("/auth-register", registerUser);
router.post("/auth-login", loginUser);
router.get("/verify-email", verifyEmail);
router.post("/logout", logoutUser);

export default router;
