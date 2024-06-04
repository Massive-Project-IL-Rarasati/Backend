import express from "express";
import usersRoute from "./users.route.js";

const router = express.Router();

router.use(usersRoute);

export default router;
