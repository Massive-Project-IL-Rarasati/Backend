-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: db_pawconnect
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `DetailKucing`
--

DROP TABLE IF EXISTS `DetailKucing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetailKucing` (
  `id_kucing` int NOT NULL,
  `nama_kucing` varchar(50) NOT NULL,
  `umur` varchar(50) NOT NULL,
  `kelamin` enum('Laki-laki','Perempuan') NOT NULL,
  `berat` decimal(10,0) NOT NULL,
  `warna` varchar(50) NOT NULL,
  `vaksin` varchar(50) NOT NULL,
  `riwayat_penyakit` varchar(50) NOT NULL,
  `lahir` date NOT NULL,
  `tersedia` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `foto_kucing` blob NOT NULL,
  `deskripsi` text NOT NULL,
  `tlp_pemilik` int NOT NULL,
  `latitude` decimal(10,6) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id_kucing`),
  KEY `fk_user_detailkucing` (`user_id`),
  CONSTRAINT `detailkucing_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_detailkucing` FOREIGN KEY (`id_kucing`) REFERENCES `Kucing` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_detailkucing` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DetailKucing`
--

LOCK TABLES `DetailKucing` WRITE;
/*!40000 ALTER TABLE `DetailKucing` DISABLE KEYS */;
/*!40000 ALTER TABLE `DetailKucing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FotoKucing`
--

DROP TABLE IF EXISTS `FotoKucing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FotoKucing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kucing_id` int NOT NULL,
  `image_path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_kucing` (`kucing_id`),
  CONSTRAINT `fk_kucing` FOREIGN KEY (`kucing_id`) REFERENCES `Kucing` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fotokucing_ibfk_1` FOREIGN KEY (`kucing_id`) REFERENCES `Kucing` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FotoKucing`
--

LOCK TABLES `FotoKucing` WRITE;
/*!40000 ALTER TABLE `FotoKucing` DISABLE KEYS */;
/*!40000 ALTER TABLE `FotoKucing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Kucing`
--

DROP TABLE IF EXISTS `Kucing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Kucing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_kucing` (`user_id`),
  CONSTRAINT `fk_user_kucing` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Kucing`
--

LOCK TABLES `Kucing` WRITE;
/*!40000 ALTER TABLE `Kucing` DISABLE KEYS */;
/*!40000 ALTER TABLE `Kucing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_depan` varchar(100) NOT NULL,
  `nama_belakang` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `photo` blob,
  `tanggal_registrasi` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `verifikasi` tinyint(1) NOT NULL DEFAULT '0',
  `verifikasi_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'John','Doe','john.doe@example.com','$2b$10$qeX8yXtH2lyvrZ44iSghAu6Ct791tAvh0IfGfRtcNCj4dICgUUw/G',NULL,'2024-06-08 07:23:50',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE3ODA2MjMwLCJleHAiOjE3MTc4MDk4MzB9.MO18UPtq1R0PtaCIIXmEOqKTG2B4iYsDx39WbxecNNA'),(3,'Brilli','Zulfa','iambrillia@gmail.com','$2b$10$74tsXLDg4Y1UxcrrEh7D..qcjT1HlM6SnQJxuRz0GEMn0a30yt15e',NULL,'2024-06-08 07:59:39',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlhbWJyaWxsaWFAZ21haWwuY29tIiwiaWF0IjoxNzE3ODA4Mzc5LCJleHAiOjE3MTc4MTE5Nzl9.jXvOSRYrWBE4v9R_pKlfZooUsX-1HayGjPsazr689gc'),(4,'Brilliannissa ','Paw','brilli_paw313@gmail.com','$2b$10$5GHn3TWKKHt5x6maOYGfxON74UaGNd296vwGwTYFkdJUdDSc1M1dS',NULL,'2024-06-09 21:00:48',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaWxsaV9wYXczMTNAZ21haWwuY29tIiwiaWF0IjoxNzE3OTQxNjQ4LCJleHAiOjE3MTc5NDUyNDh9.BHIZ29uOkVE-XT6h0Qg-ZOenD2-Ub09mUEygPqtFKgg'),(5,'Hello','Miaw','hellomiaw@gmail.com','$2b$10$BYWIbw2mxI/MRQGtprLQUOGHbo0BzxkoJDcq44t5y8/Sgz27hcyAK',NULL,'2024-06-09 21:15:07',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvbWlhd0BnbWFpbC5jb20iLCJpYXQiOjE3MTc5NDI1MDcsImV4cCI6MTcxNzk0NjEwN30.6XKK4J7ZShxwtaPowOb1X4FxPH_sYpTchGdLQQ0yslU'),(6,'Miaw','Dejiy','miaw_dejiy@gmail.com','$2b$10$CNYARS1/qCSrlysik5521eHAH9K1wF9sC3Tf.HQyXUkrJSbQn5uMy',NULL,'2024-06-09 21:25:47',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pYXdfZGVqaXlAZ21haWwuY29tIiwiaWF0IjoxNzE3OTQzMTQ3LCJleHAiOjE3MTc5NDY3NDd9.SGQQg6fFyPkCXsKvrXMSESx6eIa1aoPbNrov9jq9z5Y'),(7,'Miaw','Paw','hellomiaw1@gmail.com','$2b$10$orVgF0g0XOsSPdrPqX7GM.9TXjNuytgo4Lon2/mVzt8BqZd6V.gTW',NULL,'2024-06-10 10:37:11',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvbWlhdzFAZ21haWwuY29tIiwiaWF0IjoxNzE3OTkwNjMxLCJleHAiOjE3MTc5OTQyMzF9.lU_6TX9IFGflbQG9nEKuq5RmrjWugwC6RT3B98k9RkU'),(9,'Brilli','Zulfa','brilli354@gmail.com','$2b$10$OEe8HdIbQODknRfDgRVcme3Bb4eVVBQiW/a8zg7e5kCTCfx27Pf4S',NULL,'2024-06-12 01:44:09',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaWxsaTM1NEBnbWFpbC5jb20iLCJpYXQiOjE3MTgxMzE0NDksImV4cCI6MTcxODEzNTA0OX0.DItcHCsssOnGpAnGRrhAbosO5nYXgfy_j7go-WG5Ago'),(10,'Brilli','Zulfa','brilli@gmail.com','$2b$10$eldI47F7OF8LT4Ot8A6LgubnG.oBHmvYOKZEpIknjtpGE/AtO8PWy',NULL,'2024-06-12 01:46:21',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaWxsaUBnbWFpbC5jb20iLCJpYXQiOjE3MTgxMzE1ODEsImV4cCI6MTcxODEzNTE4MX0.ZwGr17PnTCCF5H9gQXVypeTiQoWy1nghMR_Pm3CpqOo'),(11,'Brilliannissa ','Zulfa','12210836@bsi.ac.id','$2b$10$1Lb6tH549VKqeD2XE8DNy.SQfeEovaBPq.BqAO/kkLPDRm3cU1vtu',NULL,'2024-06-13 04:17:06',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMjEwODM2QGJzaS5hYy5pZCIsImlhdCI6MTcxODIyNzAyNiwiZXhwIjoxNzE4MjMwNjI2fQ.-Nu5lAkMFnmNzuswWFcbrkD9NkLOJtpH3X318Lm7vAw'),(12,'Brilliannissa ','Zulfa','brilli_zulfa@gmail.com','$2b$10$.4SxtOC2AmPDm4Mf78pFi.6Xb3IEEoAXE6YTQNrG0hl4KAiicGjyO',NULL,'2024-06-15 18:02:48',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaWxsaV96dWxmYUBnbWFpbC5jb20iLCJpYXQiOjE3MTg0NDkzNjgsImV4cCI6MTcxODQ1Mjk2OH0.lJmnKgVKDzu3s1RVt01DXVuQUCQ-2vTg5ZeUmHLyoaY');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserEmailSettings`
--

DROP TABLE IF EXISTS `UserEmailSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserEmailSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `email_host` varchar(255) NOT NULL,
  `email_port` int NOT NULL,
  `email_user` varchar(255) NOT NULL,
  `email_pass` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `useremailsettings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserEmailSettings`
--

LOCK TABLES `UserEmailSettings` WRITE;
/*!40000 ALTER TABLE `UserEmailSettings` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserEmailSettings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-19 21:13:47
