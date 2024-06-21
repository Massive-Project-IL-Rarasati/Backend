import express from "express";
import {
    createKomunitas,
    getAllKomunitas,
    getKomunitasById,
    updateKomunitas,
    deleteKomunitas,
} from "../controller/komunitasController.js";
import upload from '../middleware/upload.js';  

const router = express.Router();

router.post('/tambah-komunitas', upload.single('image'), createKomunitas);
router.get('/tampilkan-komunitas', getAllKomunitas);
router.put('/edit-komunitas/:id_komunitas', upload.single('image'), updateKomunitas);
router.get('/byid/:id_komunitas', getKomunitasById);
router.delete('/delete/:id_komunitas', deleteKomunitas);

export default router;