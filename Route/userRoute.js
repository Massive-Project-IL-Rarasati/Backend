import express from "express";
import { getUser, getUserById, insertUser,updateUser, deleteUser } from "../Controller/userController";

const router = express.Router();

router.get("/users", getUser);
router.get("/users/:id", getUserById);
router.post("/user", insertUser);
router.put("/ubah-profil/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
