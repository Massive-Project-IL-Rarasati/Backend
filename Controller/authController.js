import { query } from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const saltRounds = 10;


const sendVerificationEmail = (email, token) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verifikasi (Paw Connect)',
        text: `Mohon verifikasi email Anda dengan mengklik tautan ini: ${process.env.BASE_URL}/verify-email?token=${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Pesan terkirim: %s', info.messageId);
    });
};

// Fungsi untuk registrasi pengguna baru
export const registerUser = async (req, res) => {
    const { nama_depan, nama_belakang, email, password, confirmPassword } = req.body;

    if (!nama_depan || !nama_belakang || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Data tidak lengkap" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Password dan Konfirmasi password tidak sesuai" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await query(
            "INSERT INTO User (nama_depan, nama_belakang, email, password_hash, verifikasi_token) VALUES (?, ?, ?, ?, ?)",
            [nama_depan, nama_belakang, email, hashedPassword, verificationToken]
        );

        // Kirim email verifikasi
        sendVerificationEmail(email, verificationToken);

        res.status(201).json({ message: "Akun Anda sukses terdaftar, mohon verifikasi melalui email Anda." });
    } catch (error) {
        res.status(500).json({ message: "Akun Anda gagal terdaftarkan!", error });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await query("SELECT * FROM User WHERE email = ?", [email]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.status(401).json({ message: "Password salah" });
        }

        const token=jwt.sign({ id: user.id, email: user.email, role: "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // const token=jwt.sign({ id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' 

        res.status(200).json({ message: "Login berhasil", token });
    } catch (error) {
        console.error('Error saat login:', error);
        res.status(500).json({ message: "Error saat login pengguna", error });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await query("UPDATE User SET verifikasi = TRUE WHERE email = ?", [decoded.email]);

        res.status(200).json({ message: "Email berhasil diverifikasi" });
    } catch (error) {
        res.status(500).json({ message: "Token tidak valid atau telah kedaluwarsa", error });
    }
};

export const logoutUser = (req, res) => {
    try {
        return res.status(200).json({ message: 'Logout berhasil' });
    } catch (error) {
        return res.status(500).json({ message: 'Terjadi kesalahan saat logout', error });
    }
};
