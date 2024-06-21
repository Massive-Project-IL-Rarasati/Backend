import { query } from "../database/db.js";

// Fungsi untuk mendapatkan semua kucing
export const getAllKucing = async (req, res) => {
    try {
        const result = await query("SELECT * FROM Kucing");
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error("Error fetching kucing data:", err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

// Fungsi untuk menambahkan kucing
export const addKucing = async (req, res) => {
    const {
        title,
        image,
        desc,
        user_id
    } = req.body;

    try {
        await query(
            "INSERT INTO Kucing (title, image, desc, user_id) VALUES (?, ?, ?, ?)",
            [title, image, desc, user_id]
        );
        return res.status(201).json({ message: "Data kucing berhasil ditambahkan", success: true });
    } catch (err) {
        console.error("Error inserting kucing data:", err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

// Fungsi untuk mengupdate kucing
export const updateKucing = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        image,
        desc,
        user_id
    } = req.body;

    try {
        await query(
            "UPDATE Kucing SET title = ?, image = ?, desc = ?, user_id = ? WHERE id = ?",
            [title, image, desc, user_id, id]
        );
        return res.status(200).json({ success: true, message: "Data kucing berhasil diupdate" });
    } catch (error) {
        console.error("Error updating kucing data:", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};

// Fungsi untuk menghapus kucing
export const deleteKucing = async (req, res) => {
    const { id } = req.params;
    try {
        await query("DELETE FROM Kucing WHERE id = ?", [id]);
        return res.status(200).json({ message: "Data kucing berhasil dihapus" });
    } catch (err) {
        console.error("Error deleting kucing data:", err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};
