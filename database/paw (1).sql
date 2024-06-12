-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Jun 2024 pada 16.12
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama_depan` varchar(50) NOT NULL,
  `nama_belakang` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama_depan`, `nama_belakang`, `email`, `password`) VALUES
(8, 'imama', 'mudah', 'mudah@gmail.com', '$2b$10$iVqmAUbaX85PY'),
(9, 'denta', 'yogi', 'yogi@gmail.com', '$2b$10$Sikfibro87mO.'),
(10, 'shafa', 'salsa', 'shafa@gmail.com', '$2b$10$qYuwc34bwSSKi'),
(11, 'ezza', 'rafel', 'rafel@gmail.com', '$2b$10$T20QnNOMx5YMY'),
(12, 'ezzi', 'rafel', 'rafel@gmail.com', '$2b$10$mToxz1Inv94MJ'),
(13, 'gojo', 'ho', 'ho@gmail.com', '$2b$10$8QVNRsv9iUWgY'),
(14, 'mar', 'tul', 'tul@gmail.com', '$2b$10$qQtgwkJ8LTDsS'),
(15, 'marika', 'tuli', 'tuli@gmail.com', '$2b$10$U6dfhhcnDCofG'),
(16, 'sate', 'byun', 'byun@gmail.com', '$2b$10$h7l3zbvcuh4/p');

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
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
