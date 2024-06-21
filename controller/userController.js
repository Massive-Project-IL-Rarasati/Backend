import { query } from "../database/db.js";

// Fungsi untuk mendapatkan user
export const getUser = async (req, res) => {
    try {
        const result = await query("SELECT * FROM User");
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

// Fungsi untuk mendapatkan user by Id
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await query("SELECT * FROM User WHERE id=?", [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }
        return res.status(200).json({ success: true, data: result });
    } catch (e) {
        console.log("Terjadi kesalahan", e);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};


// Fungsi untuk menambahkan user
export const insertUser = async (req, res) => {
    const { id } = req.body;
    try {
        await query("INSERT INTO User (id) VALUES (?)", [id]);
        return res.status(201).json({ message: "User berhasil ditambahkan" });
    } catch (err) {
        console.log("Terjadi kesalahan", err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

// Fungsi untuk mengupdate user
export const updateUser = async (req, res) => {
    const {
        nama_depan,
        nama_belakang,
        password,
        email,
    } = req.body;
    const { id } = req.params;

    try {
        const userResult = await query("SELECT * FROM User WHERE id = ?", [id]);
        if (userResult.length === 0) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }
        const user = userResult[0];

        const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : user.password;

        await query(
            "UPDATE User SET nama_depan=?, nama_belakang=?, password=?, email=? WHERE id=?",
            [
                nama_depan || user.nama_depan,
                nama_belakang || user.nama_belakang,
                hashedPassword,
                email || user.email,
                id,
            ]
        );

        const updatedUserResult = await query("SELECT * FROM User WHERE id = ?", [id]);
        const updatedUser = updatedUserResult[0];

        return res.status(200).json({ msg: "User Diubah", user: updatedUser });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};


// Fungsi untuk menghapus user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await query("DELETE FROM User WHERE id = ?", [id]);
        return res.status(200).json({ message: "User berhasil dihapus" });
    } catch (err) {
        console.log("Terjadi kesalahan", err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};
