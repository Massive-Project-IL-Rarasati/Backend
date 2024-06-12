import express from "express";
import usersRoute from "./users.route.js";
import authRoute from "./auth.route.js";
import kucingRoute from "./kucing.route.js";
import { authenticateToken } from "../middleware/validate.middleware.js";


const router = express.Router();

console.log("Nilai SECRETKEY:", process.env.SECRETKEY);
router.use(authRoute);
router.use(authenticateToken, usersRoute);
router.use(authenticateToken, kucingRoute);

export default router;
