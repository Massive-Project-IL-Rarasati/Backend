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

router.post('/add-post', upload.single('image'), createKomunitas);
router.get('/show-post', getAllKomunitas);
router.put('/edit-post/:id-post', upload.single('image'), updateKomunitas);
router.get('/byid/:id-post', getKomunitasById);
router.delete('/delete/:id-post', deleteKomunitas);

export default router;