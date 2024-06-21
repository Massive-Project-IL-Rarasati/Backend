import { query } from '../database/db.js';

export const createKomunitas = async (req, res) => {
    const { user_id, text } = req.body;
    console.log("Received values:", {
        user_id,
        text,
    });

    // Path file gambar, menggunakan multer untuk handle file upload
    const image = req.file ? req.file.path : null;  

    try {
        // Masukkan data ke dalam tabel post
        const result = await query('INSERT INTO Post (user_id, text, image) VALUES (?, ?, ?)', [user_id, text, image]);
        const insertedId = result.insertId;

        // Ambil data postingan yang baru saja ditambahkan
        const [newPost] = await query('SELECT * FROM Post WHERE id_post = ?', [insertedId]);

        // Kirim respons sukses dengan data postingan yang baru saja ditambahkan
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        // Tangani kesalahan dengan mengirimkan respons server error
        console.error('Terjadi kesalahan', error);
        res.status(500).json({ success: false, msg: 'Terjadi kesalahan pada server' });
    }
};

export const getAllKomunitas = async (req, res) => {
    try {
        const post = await query('SELECT * FROM Post');
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        console.error('Terjadi kesalahan', error);
        res.status(500).json({ success: false, msg: 'Terjadi kesalahan pada server' });
    }
};

export const getKomunitasById = async (req, res) => {
    const { 'id-post': id } = req.params;
    try {
        const [post] = await query('SELECT * FROM Post WHERE id_post = ?', [id]);
        if (!post) {
            return res.status(404).json({ success: false, msg: 'Postingan tidak ditemukan' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        console.error('Terjadi kesalahan', error);
        res.status(500).json({ success: false, msg: 'Terjadi kesalahan pada server' });
    }
};

export const updateKomunitas = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const updateData = [text, image, id];
        const result = await query('UPDATE Post SET text = ?, image = ? WHERE id_post = ?', updateData);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: 'Postingan tidak ditemukan' });
        }

        const [updatedPost] = await query('SELECT * FROM Post WHERE id_post = ?', [id]);
        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        console.error('Terjadi kesalahan', error);
        res.status(500).json({ success: false, msg: 'Terjadi kesalahan pada server' });
    }
};

export const deleteKomunitas = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await query('DELETE FROM Post WHERE id_post = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: 'Postingan tidak ditemukan' });
        }

        res.status(200).json({ success: true, msg: 'Postingan berhasil dihapus' });
    } catch (error) {
        console.error('Terjadi kesalahan', error);
        res.status(500).json({ success: false, msg: 'Terjadi kesalahan pada server' });
    }
};
