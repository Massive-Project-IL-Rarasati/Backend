import bcrypt from "bcrypt";
import { query } from '../database/db.js';



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
    const userResult = await query("SELECT * FROM users WHERE id = ?", [id]);
    if (userResult.length === 0) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    const user = userResult[0];

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

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

    const updatedUserResult = await query("SELECT * FROM users WHERE id = ?", [id]);
    const updatedUser = updatedUserResult[0];

    return res.status(200).json({ msg: "User Diubah", user: updatedUser });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
