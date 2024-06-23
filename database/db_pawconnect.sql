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
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
                        `id_post` int NOT NULL AUTO_INCREMENT,
                        `user_id` int DEFAULT NULL,
                        `text` text NOT NULL,
                        `image` blob,
                        `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                        PRIMARY KEY (id_post),
                        FOREIGN KEY fk_user_id (user_id) REFERENCES User (id)
) ENGINE=InnoDB;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (1,1,'Haloooo',NULL,'2024-06-22 10:33:22'),(2,1,'Jangan error lagi yaaa\r\n',NULL,'2024-06-22 10:33:55'),(3,1,'Jangan tiba2 ngilang y codingannya, databasenya :\'\')\r\n',NULL,'2024-06-22 14:45:45'),(4,1,'Bismillahhh menyala ya ges yaa ^^\r\n',NULL,'2024-06-22 14:48:12');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
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
                        `role` varchar(50) NOT NULL DEFAULT 'user',
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Brilli','Zulfa','brilli@gmail.com','$2b$10$yxRAQwcVgvv93AV4yxxDk.4eFKrtzFVWZPsAqoLnD55KuJhVZAyL2',NULL,'2024-06-22 17:33:05',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaWxsaUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTA1MjM4NSwiZXhwIjoxNzE5MDU1OTg1fQ.MfDWgLaurZXVDlZ8GfI766KzrI20vyqOlNgntEIIO8s','admin');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-23 21:17:57

select * from User;

select *
from Post
left join User U on Post.user_id = U.id