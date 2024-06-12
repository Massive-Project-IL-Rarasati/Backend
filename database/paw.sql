-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Jun 2024 pada 11.57
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paw`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kucing`
--

CREATE TABLE `kucing` (
  `cat_id` int(11) NOT NULL,
  `nama_kucing` varchar(50) NOT NULL,
  `umur` varchar(50) NOT NULL,
  `kelamin` enum('Laki-laki','Perempuan') NOT NULL,
  `berat` decimal(10,0) NOT NULL,
  `warna` varchar(50) NOT NULL,
  `vaksin` varchar(50) NOT NULL,
  `riwayat_penyakit` varchar(50) NOT NULL,
  `lahir` date NOT NULL,
  `tersedia` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `foto_kucing` blob NOT NULL,
  `deskripsi` text NOT NULL,
  `tlp_pemilik` int(20) NOT NULL,
  `lokasi` point NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kucing`
--

INSERT INTO `kucing` (`cat_id`, `nama_kucing`, `umur`, `kelamin`, `berat`, `warna`, `vaksin`, `riwayat_penyakit`, `lahir`, `tersedia`, `foto_kucing`, `deskripsi`, `tlp_pemilik`, `lokasi`) VALUES
(1, 'ikan', '', '', 0, '', '', '', '0000-00-00', '2024-06-12 09:55:27', '', '', 0, 0x0000000001010000005470784144b45a40cdcccccccccc18c0),
(2, 'bobby', '1 bulan', 'Laki-laki', 1, 'Ungu', '3 kali', 'Tidak ada', '2023-12-09', '2024-06-12 09:27:50', 0x433a5c55736572735c44656c6c5c446f776e6c6f6164735c4261636b656e645c75706c6f6164735c313731383138343437303038392e6a7067, 'Kucing mempesona', 2147483647, 0x000000000101000000000000b2a54bf84100000040d6295cc1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama_depan` varchar(50) NOT NULL,
  `nama_belakang` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama_depan`, `nama_belakang`, `email`, `password`, `role`) VALUES
(8, 'imama', 'mudah', 'mudah@gmail.com', '$2b$10$iVqmAUbaX85PY', 'admin'),
(9, 'denta', 'yogi', 'yogi@gmail.com', '$2b$10$Sikfibro87mO.', ''),
(10, 'shafa', 'salsa', 'shafa@gmail.com', '$2b$10$qYuwc34bwSSKi', ''),
(11, 'ezza', 'rafel', 'rafel@gmail.com', '$2b$10$T20QnNOMx5YMY', ''),
(12, 'ezzi', 'rafel', 'rafel@gmail.com', '$2b$10$mToxz1Inv94MJ', ''),
(13, 'gojo', 'ho', 'ho@gmail.com', '$2b$10$8QVNRsv9iUWgY', ''),
(14, 'mar', 'tul', 'tul@gmail.com', '$2b$10$qQtgwkJ8LTDsS', ''),
(15, 'marika', 'tuli', 'tuli@gmail.com', '$2b$10$U6dfhhcnDCofG', ''),
(16, 'sate', 'byun', 'byun@gmail.com', '$2b$10$h7l3zbvcuh4/p', ''),
(17, 'haris', 'je', 'je@gmail.com', '$2b$10$vYmgpD1ngrh5v', 'admin'),
(18, 'haris', 'je', 'jeje@gmail.com', '$2b$10$b9sq073slcJM1', 'user');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kucing`
--
ALTER TABLE `kucing`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kucing`
--
ALTER TABLE `kucing`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
