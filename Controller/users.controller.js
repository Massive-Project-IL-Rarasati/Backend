import bcrypt from 'bcrypt';
import { query } from '../database/db.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const result = await query('SELECT * FROM users WHERE email = ?', [email]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'User tidak ditemukan' });
    }

    const user = result[0];

    // Periksa password
    const testPassword = 'yourTestPassword';
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    console.log('Password:', testPassword);
    console.log('Hashed Password:', hashedPassword);

    const isMatch = await bcrypt.compare(testPassword, hashedPassword);
    console.log('Password match:', isMatch);
    //const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Password yang dimasukkan:', password);
      console.log('Password yang disimpan:', user.password);
      return res.status(400).json({ msg: 'Password salah' });
    }

    // Hapus password dari respons
    const { password: userPassword, ...userWithoutPassword } = user;

    return res.status(200).json({ msg: 'Login berhasil', user: userWithoutPassword });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};


export const registerUser = async (req, res) => {
  const { nama_depan, nama_belakang, email, password } = req.body;

  try {
    // Hash password sebelum disimpan di database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Menyimpan data pengguna ke database
    const result = await query(
      'INSERT INTO users (nama_depan, nama_belakang, email, password) VALUES (?, ?, ?, ?)',
      [nama_depan, nama_belakang, email, hashedPassword]
    );

    // Mengambil data pengguna yang baru saja ditambahkan
    const newUser = await query('SELECT * FROM users WHERE id = ?', [result.insertId]);

    return res.status(200).json({ msg: 'User Ditambahkan', user: newUser[0] });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await query("SELECT * FROM users");
    return res.status(200).json({ success: true, data: result });
  } catch (e) {
    console.log("Terjadi kesalahan", e);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("SELECT * FROM users WHERE id=?", [
      id,
    ]);
    console.log(result);
    return res.status(200).json({ success: true, data: result });
  } catch (e) {
    console.log("Terjadi kesalahan", e);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const updateUsers = async (req, res) => {
  const {
    nama_depan,
    nama_belakang,
    password,
    email,
  } = req.body;
  const { id } = req.params;

  try {
    // Ambil data pengguna saat ini
    const userResult = await query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    if (userResult.length === 0) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    const user = userResult[0];

    // Jika password ada di body, hash password baru, jika tidak gunakan password lama
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    // Update pengguna dengan data baru atau data lama jika tidak ada perubahan
    await query(
      "UPDATE users SET nama_depan=?, nama_belakang=?, password=?, email=? WHERE id=?",
      [
        nama_depan || user.nama_depan,
        nama_belakang || user.nama_belakang,
        hashedPassword,
        email || user.email,
        id,
      ]
    );

    // Ambil data pengguna yang baru diubah
    const updatedUserResult = await query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    const updatedUser = updatedUserResult[0];

    return res.status(200).json({ msg: "User Diubah", user: updatedUser });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};