import { query } from "../database/db.js";

export const getAllDetailKucing = async (req, res) => {
    try {
        const result = await query("SELECT * FROM DetailKucing");
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error("Error fetching detail kucing data:", err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

export const addDetailKucing = async (req, res) => {
    const {
        id_kucing,
        nama_kucing,
        umur,
        kelamin,
        berat,
        warna,
        vaksin,
        riwayat_penyakit,
        lahir,
        deskripsi,
        tlp_pemilik,
        latitude,
        longitude,
        user_id
    } = req.body;

    try {
        await query(
            "INSERT INTO DetailKucing (id_kucing, nama_kucing, umur, kelamin, berat, warna, vaksin, riwayat_penyakit, lahir, deskripsi, tlp_pemilik, latitude, longitude, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [id_kucing, nama_kucing, umur, kelamin, berat, warna, vaksin, riwayat_penyakit, lahir, deskripsi, tlp_pemilik, latitude, longitude, user_id]
        );
        return res.status(201).json({ message: "Detail kucing berhasil ditambahkan", success: true });
    } catch (err) {
        console.error("Error inserting detail kucing data:", err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

export const updateDetailKucing = async (req, res) => {
    const { id_kucing } = req.params;
    const {
        nama_kucing,
        umur,
        kelamin,
        berat,
        warna,
        vaksin,
        riwayat_penyakit,
        lahir,
        deskripsi,
        tlp_pemilik,
        latitude,
        longitude,
        user_id
    } = req.body;

    try {
        await query(
            "UPDATE DetailKucing SET nama_kucing = ?, umur = ?, kelamin = ?, berat = ?, warna = ?, vaksin = ?, riwayat_penyakit = ?, lahir = ?, deskripsi = ?, tlp_pemilik = ?, latitude = ?, longitude = ?, user_id = ? WHERE id_kucing = ?",
            [nama_kucing, umur, kelamin, berat, warna, vaksin, riwayat_penyakit, lahir, deskripsi, tlp_pemilik, latitude, longitude, user_id, id_kucing]
        );
        return res.status(200).json({ success: true, message: "Detail kucing berhasil diupdate" });
    } catch (error) {
        console.error("Error updating detail kucing data:", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};

export const deleteDetailKucing = async (req, res) => {
    const { id_kucing } = req.params;
    try {
        await query("DELETE FROM DetailKucing WHERE id_kucing = ?", [id_kucing]);
        return res.status(200).json({ message: "Detail kucing berhasil dihapus" });
    } catch (err) {
        console.error("Error deleting detail kucing data:", err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};
