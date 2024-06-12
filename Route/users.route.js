import express from "express";
import {
  // loginUser,
  // registerUser,
  getUsers,
  getUserById,
  updateUsers,
  deleteUser,
} from "../Controller/users.controller.js";

const router = express.Router();

// router.post("/login", loginUser);
// router.post("/register", registerUser);
router.put("/ubah_profil/:id", updateUsers);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.delete("/delete_user/:id", deleteUser);

export default router;
