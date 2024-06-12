import express from "express";
import {
    tambahKucing,
    editKucing,
    getKucing,
} from "../Controller/kucing.controller.js";
import upload from '../middleware/upload.middleware.js';  // Assuming this handles file uploads
import checkAdmin from '../middleware/checkAdmin.js';
import { authenticateToken } from '../middleware/validate.middleware.js';

const router = express.Router();

router.post('/tambahkucing', authenticateToken, checkAdmin, upload.single('foto_kucing'), tambahKucing);
router.put('/editkucing/:cat_id', authenticateToken, checkAdmin, upload.single('foto_kucing'), editKucing);
//router.put('', authenticateToken, editKucing);
router.get("/kucing", getKucing);
export default router;