import express from 'express';
import authRoutes from './authRoute.js';
import userRoutes from './userRoute.js';
import kucingRoute from "./kucingRoute.js";
import detailKucingRoute from "./detailKucingRoute.js";
import komunitasRoute from "./komunitasRoute.js";

const router = express.Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(kucingRoute);
router.use(detailKucingRoute);
router.use(komunitasRoute);

export default router;
