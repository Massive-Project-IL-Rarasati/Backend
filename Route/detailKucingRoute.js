import express from "express";
import { getAllDetailKucing, addDetailKucing, updateDetailKucing, deleteDetailKucing } from "../controller/detailKucingController.js";
import upload from "../middleware/upload.js";

import {authMiddlewareAdmin, authMiddlewareUser} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/detail-kucing", authMiddlewareUser,upload.single("foto_kucing"), getAllDetailKucing);
router.post("/detail-kucing", authMiddlewareAdmin, upload.single("foto_kucing"), addDetailKucing);
router.put("/detail-kucing/:id_kucing",authMiddlewareAdmin,upload.single("foto_kucing"), updateDetailKucing);
router.delete("/detail-kucing/:id_kucing",authMiddlewareAdmin, deleteDetailKucing);

export default router;
