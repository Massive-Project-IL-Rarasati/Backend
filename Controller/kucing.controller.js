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
  } = req.body;

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  // Log values for debugging
  console.log("Received values:", {
    latitude,
    longitude,
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
  });

  // Pastikan nilai latitude dan longitude terdefinisi
  if (!latitude || !longitude) {
    return res.status(400).json({ msg: "Latitude dan longitude harus didefinisikan" });
  }

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



// export const tambahKucing = async (req, res) => {
//   const {
//     nama_kucing,
//     umur,
//     kelamin,
//     berat,
//     warna,
//     vaksin,
//     riwayat_penyakit,
//     lahir,
//     deskripsi,
//     tlp_pemilik,
//     latitude,
//     longitude
//   } = req.body;

//   const foto_kucing = req.file ? req.file.path : null;  // Assuming multer is used to handle file upload
//   const lokasi = `POINT(${longitude} ${latitude})`;

//   try {
//     const result = await query(
//       "INSERT INTO kucing (nama_kucing, umur, kelamin, berat, warna, vaksin, riwayat_penyakit, lahir, tersedia, foto_kucing, deskripsi, tlp_pemilik, lokasi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ST_GeomFromText(?))",
//       [nama_kucing, umur, kelamin, berat, warna, vaksin, riwayat_penyakit, lahir, foto_kucing, deskripsi, tlp_pemilik, lokasi]
//     );
//     res.status(201).json({ success: true, data: result });
//   } catch (error) {
//     console.error("Terjadi kesalahan", error);
//     res.status(500).json({ msg: "Terjadi kesalahan pada server" });
//   }
// };

export const editKucing = async (req, res) => {
  const { cat_id } = req.params;
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

  // Periksa apakah latitude dan longitude terdefinisi
  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ msg: 'Latitude atau longitude tidak terdefinisi' });
  }

  const foto_kucing = req.file ? req.file.path : null;  // Assuming multer is used to handle file upload
  const lokasi = `POINT(${longitude} ${latitude})`;

  try {
    const result = await query(
      "UPDATE kucing SET nama_kucing=?, umur=?, kelamin=?, berat=?, warna=?, vaksin=?, riwayat_penyakit=?, lahir=?, foto_kucing=?, deskripsi=?, tlp_pemilik=?, lokasi=ST_GeomFromText(?) WHERE cat_id=?",
      [nama_kucing, umur, kelamin, berat, warna, vaksin, riwayat_penyakit, lahir, foto_kucing, deskripsi, tlp_pemilik, lokasi, cat_id]
    );
    res.status(200).json({ success: true, msg: "Data kucing berhasil diperbarui" });
  } catch (error) {
    console.error("Terjadi kesalahan", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};


export const getKucing = async (req, res) => {
  try {
    const result = await query("SELECT * FROM kucing");
    return res.status(200).json({ success: true, data: result });
  } catch (e) {
    console.log("Terjadi kesalahan", e);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};



