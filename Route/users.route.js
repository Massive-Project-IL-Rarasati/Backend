import express from "express";
import {
  loginUser,
  registerUser,
  getUsers,
  getUserById,
  updateUsers,
} from "../Controller/users.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.put("/ubah_profil/:id", updateUsers);
router.get("/users", getUsers);
router.get("/users/:user_id", getUserById);

export default router;
