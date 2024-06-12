import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../database/db.js";

export const register = async (req, res) => {
  const { nama_depan, nama_belakang, email, password, confPassword } = req.body;

  if (
    nama_depan === "" || nama_depan === undefined ||
    nama_belakang === "" || nama_belakang === undefined ||
    email === "" || email === undefined ||
    password === "" || password === undefined ||
    confPassword === "" || confPassword === undefined
  ) {
    return res.status(400).json({ error: "Field must not be empty" });
  }

  if (password !== confPassword) {
    return res.status(400).json({ error: "Password not match" });
  }

  try {
    // Hash password sebelum disimpan di database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Menyimpan data pengguna ke database dengan role default 'user'
    const result = await query(
      'INSERT INTO users (nama_depan, nama_belakang, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [nama_depan, nama_belakang, email, hashedPassword, 'user']
    );

    // Mengambil data pengguna yang baru saja ditambahkan
    const newUser = await query('SELECT * FROM users WHERE id = ?', [result.insertId]);

    return res.status(200).json({ msg: 'User Ditambahkan', user: newUser[0] });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
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

    const { password: userPassword, ...userWithoutPassword } = user;

    const data = {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
      role: userWithoutPassword.role,
    };

    console.log("Membuat token JWT untuk pengguna:", data);
    jwt.sign(data, process.env.SECRETKEY, (err, token) => {
      if (err) {
        console.error("Kesalahan saat membuat token:", err);
        throw err;
      }
      console.log("Token berhasil dibuat:", token);
      return res.status(200).json({ Authorization: `Bearer ${token}` });
    });
    //return res.status(200).json({ msg: 'Login berhasil', user: userWithoutPassword });
 } catch (error) {
      console.log('Terjadi kesalahan', error);
      return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
    }
  };



// export const login = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Cari pengguna berdasarkan email
//       const result = await query('SELECT * FROM users WHERE email = ?', [email]);
  
//       if (result.length === 0) {
//         return res.status(404).json({ msg: 'User tidak ditemukan' });
//       }
  
//       const user = result[0];
  
//       // Periksa password
//       const testPassword = 'yourTestPassword';
//       const hashedPassword = await bcrypt.hash(testPassword, 10);
//       console.log('Password:', testPassword);
//       console.log('Hashed Password:', hashedPassword);
  
//       const isMatch = await bcrypt.compare(testPassword, hashedPassword);
//       console.log('Password match:', isMatch);
//       //const isMatch = await bcrypt.compare(password, user.password);
  
//       if (!isMatch) {
//         console.log('Password yang dimasukkan:', password);
//         console.log('Password yang disimpan:', user.password);
//         return res.status(400).json({ msg: 'Password salah' });
//       }
  
//       // Hapus password dari respons
//       const { password: userPassword, ...userWithoutPassword } = user;
      
//       const data = {
//         id: userWithoutPassword.id,
//         email: userWithoutPassword.email,
//     };

//     console.log("Membuat token JWT untuk pengguna:", data);
//     jwt.sign(data, process.env.SECRETKEY, (err, token) => {
//       if (err) {
//         console.error("Kesalahan saat membuat token:", err);
//         throw err;
//       }
//       console.log("Token berhasil dibuat:", token);
//       return res.status(200).json({ Authorization: `Bearer ${token}` });
//     });
//     //return res.status(200).json({ msg: 'Login berhasil', user: userWithoutPassword });
//  } catch (error) {
//       console.log('Terjadi kesalahan', error);
//       return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
//     }
//   };

