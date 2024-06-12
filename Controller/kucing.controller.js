import { query } from '../database/db.js'

export const tambahKucing = async (req, res) => {
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
    longitude
  } = req.body;

  const foto_kucing = req.file ? req.file.path : null;  // Assuming multer is used to handle file upload
  const lokasi = `POINT(${longitude} ${latitude})`;

  try {
    const result = await query(
      "INSERT INTO kucing (nama_kucing, umur, kelamin, berat, warna, vaksin, riwayat_penyakit, lahir, tersedia, foto_kucing, deskripsi, tlp_pemilik, lokasi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ST_GeomFromText(?))",
      [nama_kucing, umur, kelamin, berat, warna, vaksin, riwayat_penyakit, lahir, foto_kucing, deskripsi, tlp_pemilik, lokasi]
    );
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error("Terjadi kesalahan", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
