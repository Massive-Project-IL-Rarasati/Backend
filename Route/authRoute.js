import express from "express";
import { registerUser, loginUser, verifyEmail, logoutUser } from "../Controller/authController";


const router = express.Router();

router.post("/auth-register", registerUser);
router.post("/auth-login", loginUser);
router.get("/verify-email", verifyEmail);
router.post("/logout", logoutUser);

export default router;
