/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `cinema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `cineplexId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cineplexId` (`cineplexId`),
  CONSTRAINT `cinema_ibfk_1` FOREIGN KEY (`cineplexId`) REFERENCES `cineplex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cinema_movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cinemaId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movieId` (`movieId`),
  KEY `cinemaId` (`cinemaId`),
  CONSTRAINT `cinema_movie_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`),
  CONSTRAINT `cinema_movie_ibfk_2` FOREIGN KEY (`cinemaId`) REFERENCES `cinema` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cineplex` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `time` int DEFAULT NULL,
  `evaluate` int DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `showtimeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `showtimeId` (`showtimeId`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`showtimeId`) REFERENCES `showtime` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `showtime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startTime` datetime DEFAULT NULL,
  `cinemaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cinemaId` (`cinemaId`),
  CONSTRAINT `showtime_ibfk_1` FOREIGN KEY (`cinemaId`) REFERENCES `cinema` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `movieId` (`movieId`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(1, '5th Avenue Cinema', 'Portland, Oregon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/5th_Avenue_Cinema-1.jpg/750px-5th_Avenue_Cinema-1.jpg', 1);
INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(2, 'Jean Cocteau Cinema', ' 418 Montezuma Ave, Santa Fe, NM 87501', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/d7/65/95/jean-cocteau-cinema.jpg?w=1200&h=1200&s=1', 2);


INSERT INTO `cineplex` (`id`, `name`, `logo`) VALUES
(1, 'BHD', 'https://statics.vincom.com.vn/http/vincom-ho/thuong_hieu/anh_logo/BHD-Cineplex.png/05581bb0e85523cf82ca625efef5fffc.webp');
INSERT INTO `cineplex` (`id`, `name`, `logo`) VALUES
(2, 'CGV', 'https://inkythuatso.com/uploads/thumbnails/800/2021/09/cgv-logo-inkythuatso-1-14-16-41-01.jpg');


INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`) VALUES
(1, 'Zelig', '1983-07-15', 79, 5, 'https://d2ycltig8jwwee.cloudfront.net/features/33/fullwidth.0521d7cb.jpg');
INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`) VALUES
(2, 'Radio Days', '1987-01-30', 88, 4, 'https://cdn.shopify.com/s/files/1/1416/8662/products/1_69340792-9a16-4209-92b0-05c29732b2dd_spo_5000x.jpg?v=1551796572');
INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`) VALUES
(3, 'Elvis', '2022-06-23', 160, 5, 'https://m.media-amazon.com/images/I/812SwQ1toSL._AC_SL1200_.jpg');
INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`) VALUES
(4, 'The World According To Garp', '1982-07-23', 136, 5, 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/503c618d11e4f9c31fd87940429f4e65e9e3bae507afff8310b3d3c2e6e28e89._RI_V_TTW_.jpg'),
(5, 'Treasure Island', '1934-08-17', 105, 4, 'https://upload.wikimedia.org/wikipedia/commons/7/77/Poster_-_Treasure_Island_%281934%29_01_colour_edit.jpg');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;