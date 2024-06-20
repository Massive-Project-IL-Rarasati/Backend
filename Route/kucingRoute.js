import express from "express";
import { getAllKucing, addKucing, updateKucing, deleteKucing } from "../controller/kucingController.js";
import upload from "../middleware/upload.js";
import { authMiddlewareAdmin, authMiddlewareUser } from "../middleware/authMiddleware.js";


const router = express.Router();


router.get("/kucing", authMiddlewareUser, upload.single("foto_kucing"), getAllKucing);
router.post("/kucing", authMiddlewareAdmin,upload.single("foto_kucing"), addKucing);
router.put("/kucing/:id", authMiddlewareAdmin, upload.single("foto_kucing"),updateKucing);
router.delete("/kucing/:id", authMiddlewareAdmin, deleteKucing);


export default router;
