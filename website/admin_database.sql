-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2025 at 01:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `email`, `password`, `first_name`, `last_name`, `city`, `country`, `role`) VALUES
(1, 'admin@petition.com', 'admin', 'Edgar', 'Loris', 'London', 'England', 'Admin'),
(2, 'simpleGuy@gmail.com', 'simpleGuy', 'Rick', 'Young', 'Edmonton', 'Canada', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `petitions`
--

CREATE TABLE `petitions` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `goal` varchar(255) NOT NULL,
  `location` varchar(100) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `image` blob DEFAULT NULL,
  `member_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `petitions`
--

INSERT INTO `petitions` (`id`, `title`, `goal`, `location`, `description`, `image`, `member_id`) VALUES
(1, 'Stop Racism!', 'End football racism at the stadiums!', 'Across UK', 'Football racism is increasing everywhere in the UK, especially during the games in the stadiums. Sign this petition and pledge to not be racist and spread the good word!', NULL, 2),
(3, 'Save the whales!', 'Stop eating whale products.', 'Glasgow', 'Sign this petition and pledge that you will never again buy or eat any product made from a whale!!', NULL, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `petitions`
--
ALTER TABLE `petitions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `petitions`
--
ALTER TABLE `petitions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `petitions`
--
ALTER TABLE `petitions`
  ADD CONSTRAINT `petitions_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
