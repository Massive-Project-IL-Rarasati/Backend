import express from "express";
import { getAllKucing, addKucing, updateKucing, deleteKucing } from "../Controller/kucingController.js";
import upload from "../middleware/upload.js";
import checkAdmin from '../middleware/checkAdmin.js';
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


router.get("/kucing", authMiddleware,checkAdmin, upload.single("foto_kucing"), getAllKucing);
router.post("/kucing", authMiddleware,checkAdmin, upload.single("foto_kucing"), addKucing);
router.put("/kucing/:id", authMiddleware, checkAdmin, upload.single("foto_kucing"),updateKucing);
router.delete("/kucing/:id", deleteKucing);


export default router;