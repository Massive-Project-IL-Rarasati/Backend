import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from './route/authRoute.js';
import userRoute from './route/userRoute.js';
import kucingRoute from './route/kucingRoute.js';
import detailKucingRoute from './route/detailKucingRoute.js';
import { testConnection } from './database/db.js';
import passport from 'passport';
import upload from "./middleware/upload.js";
import checkAdmin from './middleware/checkAdmin.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Test database connection
testConnection();

// Use the routers
app.use(authRoute);
app.use(userRoute);
app.use(kucingRoute);
app.use(detailKucingRoute);

app.get("/", (req, res) => {
    return res.status(200).json("OK lanjut 354");
});

app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    return res.status(200).json({ message: "File successfully uploaded" });
});

app.post("/addKucing", checkAdmin, (req, res) => {
    // Only admin users can add a cat
    return res.status(200).json({ message: "Kucing successfully added" });
});

app.use('/api/kucing', kucingRoute);

app.use('/api/detailkucing', detailKucingRoute);



// Handle 404
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.APP_PORT}`);
});
