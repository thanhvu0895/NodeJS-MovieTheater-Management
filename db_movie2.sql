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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cinema_movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cinemaId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movieId` (`movieId`),
  KEY `cinemaId` (`cinemaId`),
  CONSTRAINT `cinema_movie_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`),
  CONSTRAINT `cinema_movie_ibfk_2` FOREIGN KEY (`cinemaId`) REFERENCES `cinema` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=18553 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `movieId` (`movieId`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(1, 'BHD cinema 1', 'Portland, Oregon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/5th_Avenue_Cinema-1.jpg/750px-5th_Avenue_Cinema-1.jpg', 1);
INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(2, 'CGV cinema 1', ' 418 Montezuma Ave, Santa Fe, NM 87501', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/d7/65/95/jean-cocteau-cinema.jpg?w=1200&h=1200&s=1', 2);
INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(3, 'BHD cinema 2', 'hanoi', 'url.jpg', 1);
INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(4, 'CGV cinema 2', 'hcm', 'url.jpg', 2);

INSERT INTO `cinema_movie` (`id`, `cinemaId`, `movieId`) VALUES
(1, 1, 1);
INSERT INTO `cinema_movie` (`id`, `cinemaId`, `movieId`) VALUES
(2, 2, 3);
INSERT INTO `cinema_movie` (`id`, `cinemaId`, `movieId`) VALUES
(3, 1, 2);
INSERT INTO `cinema_movie` (`id`, `cinemaId`, `movieId`) VALUES
(4, 2, 4),
(5, 1, 1);

INSERT INTO `cineplex` (`id`, `name`, `logo`) VALUES
(1, 'BHD', 'https://statics.vincom.com.vn/http/vincom-ho/thuong_hieu/anh_logo/BHD-Cineplex.png/05581bb0e85523cf82ca625efef5fffc.webp');
INSERT INTO `cineplex` (`id`, `name`, `logo`) VALUES
(2, 'CGV', 'https://inkythuatso.com/uploads/thumbnails/800/2021/09/cgv-logo-inkythuatso-1-14-16-41-01.jpg');


INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`) VALUES
(1, 'Zelig', '1983-07-15', 79, 5, '/public/image/1663163237648_logo.jpg');
INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`) VALUES
(2, 'Radio Days', '1987-01-30', 88, 4, '/public/image/1663163269822_logo.jpg');
INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`) VALUES
(3, 'Elvis', '2022-06-23', 160, 5, 'https://m.media-amazon.com/images/I/812SwQ1toSL._AC_SL1200_.jpg');
INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`) VALUES
(4, 'The World According To Garp', '1982-07-23', 136, 5, 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/503c618d11e4f9c31fd87940429f4e65e9e3bae507afff8310b3d3c2e6e28e89._RI_V_TTW_.jpg'),
(9, NULL, NULL, NULL, NULL, '/public/image/1662522334744_logo.jpg'),
(10, NULL, NULL, NULL, NULL, '/public/image/1662522721378_logo.jpg'),
(11, NULL, NULL, NULL, NULL, '/public/image/1662522908471_logo.jpg'),
(12, NULL, NULL, NULL, NULL, '/public/image/1662522934847_logo.jpg'),
(13, 'Abc', NULL, 123, 5, '/public/image/1662523171364_logo.jpg'),
(19, 'Abc', '2022-12-02', 123, 5, '/public/image/1663163432673_logo.jpg'),
(20, '1', '2022-12-02', 123, 5, 'abc'),
(22, 'Phim đã thêm', '2022-12-02', 123, 5, '/public/image/1663165232652_logo.jpg'),
(23, '1', '2022-12-02', 123, 5, '/public/image/1663165319571_logo.jpg');



INSERT INTO `showtime` (`id`, `startTime`, `cinemaId`) VALUES
(18529, '2019-01-01 10:10:00', 1);
INSERT INTO `showtime` (`id`, `startTime`, `cinemaId`) VALUES
(18550, '2019-01-04 16:10:00', 2);
INSERT INTO `showtime` (`id`, `startTime`, `cinemaId`) VALUES
(18551, '2019-01-04 18:10:00', 1);
INSERT INTO `showtime` (`id`, `startTime`, `cinemaId`) VALUES
(18552, '2019-01-04 20:10:00', 2);

INSERT INTO `ticket` (`id`, `userId`, `movieId`) VALUES
(1, 1, 1);
INSERT INTO `ticket` (`id`, `userId`, `movieId`) VALUES
(2, 2, 2);
INSERT INTO `ticket` (`id`, `userId`, `movieId`) VALUES
(3, 3, 4);
INSERT INTO `ticket` (`id`, `userId`, `movieId`) VALUES
(4, 4, 1);

INSERT INTO `user` (`id`, `name`, `email`, `pass_word`, `phone`, `role_id`) VALUES
(1, 'Tony', 'tony@gmail.com', '1234', NULL, NULL);
INSERT INTO `user` (`id`, `name`, `email`, `pass_word`, `phone`, `role_id`) VALUES
(2, 'John', 'john@gmail.com', '1234', NULL, NULL);
INSERT INTO `user` (`id`, `name`, `email`, `pass_word`, `phone`, `role_id`) VALUES
(3, 'Mick', 'mick@gmail.com', '1234', NULL, NULL);
INSERT INTO `user` (`id`, `name`, `email`, `pass_word`, `phone`, `role_id`) VALUES
(4, 'Nick', 'nick@gmail.com', '1234', NULL, NULL),
(7, 'da sua doi', 'dasuadoi@gmail.com', '$2b$10$TWLwzHxh.Nk/0Mw96CCeB.tXrmajKkBl.mE/hqGqfPkyiFJHjTMTC', '000000000', 3),
(8, 'testuser10', 'abc@gmail.com', '$2b$10$9SHmtfLxYPA9Hzvg/QqkYeqZV5Sq8hDIFs99FLnnHPbyDtzdcWMOm', '0123456789', 3),
(9, 'testuser10', 'abcd@gmail.com', '$2b$10$A1IcIAoxfTdNcYfzXb9AFuaYu.IUb7h.ATYwGrKHQEDOPyIbXAgj6', '0123456789', 3),
(10, 'da sua doi', 'dasuadoi@gmail.com', '$2b$10$tEn9Rs9hUHexdiixc/KeNODTNNw1SM8/USq41XJ8fqISO5/AOrTNW', '000000000', 3),
(12, 'testuser10', 'abcdea@gmail.com', '$2b$10$DBlxLU5kuGZwZ8t5A3/jI.HesZH7PR6HWdnetgc2cyHvfa4A3a3Vy', '0123456789', 3),
(13, 'testuser10', 'abcdeas@gmail.com', '$2b$10$4GwgVkOGBhqwAdcNiS1OkefG2ctTV2q/xeizL7pQfb5AK72hQ0bk.', '0123456789', 3),
(14, 'testuser10', 'abcdeaa@gmail.com', '$2b$10$g5dk0H1UZ4en2xCBn3V7pOEOT0.XWrflLvGOnQCSW7Vo0ta8g.ACO', '0123456789', NULL),
(15, 'testuser10', 'abcdeaaa@gmail.com', '$2b$10$kZdmtQIRfyY31KzNw5swvuHX3IL3/dazv1mFZFifXnCTQIsncD6Ua', '0123456789', NULL),
(16, 'testuser10', 'abcdeasa@gmail.com', '$2b$10$oWVG3jB0ZlC/.0MxArbsvOfvgf2GdM1GU0yM/0Ga.CERHFA3yb9nW', '0123456789', 3),
(17, 'testuser10', 'ab55@gmail.com', '$2b$10$/xSdMw/lIOOboRQQbRHS6.ZREKzLuQOpzIZCdnYsDyI01.QgTnAQS', '0123456789', NULL),
(19, 'testuser10', 'ab551@gmail.com', '$2b$10$302TdjPS1FbZnVVEuam7f.MPmWjUOTgrQoHm84yIY1U.W8BJXO/Pm', '0123456789', NULL),
(20, 'testuser10', 'abcdeasaa@gmail.com', '$2b$10$YgAY4Jw2R/0qhMEZC0wIs.dzmIWDNmamwVESKMyuXnL7TO.J34luG', '0123456789', 3),
(21, 'da sua doi', 'dasuadoi@gmail.com', '$2b$10$aGmRmS.llZdyPFhYqDakKuYTXg1CHKOdBNiIGt1uanYKiZoFFekFm', '000000000', 3),
(22, 'testuser20', 'testemail20@gmail.com', '$2b$10$DUwBpCAVFLTE9K15DiNHae9aWJeXQnfCDttdW51oUMIIKVtYuOiHm', '0123456789', NULL),
(23, 'testuser10', 'testthemnguoidung@gmail.com', '$2b$10$1lUKp88CIwBc8YLU3oZG.e8J1UezhoY/vKV86C0YT9oB2yloGWlhG', '0123456789', 3);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;