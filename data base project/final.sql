-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-01-06 08:30:20
-- 伺服器版本： 10.4.22-MariaDB
-- PHP 版本： 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `final`
--

-- --------------------------------------------------------

--
-- 資料表結構 `comfirm`
--

CREATE TABLE `comfirm` (
  `foodID` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `foodtype`
--

CREATE TABLE `foodtype` (
  `foodID` int(15) NOT NULL,
  `store_number` varchar(30) NOT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `Price` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `foodtype`
--

INSERT INTO `foodtype` (`foodID`, `store_number`, `Name`, `Price`) VALUES
(1, 'A01', '鮭魚生魚片', 100),
(2, 'A01', '星鰻握壽司', 400),
(3, 'A01', '北寄貝', 200),
(5, 'A02', '牛肉漢堡', 100),
(6, 'A02', '炸蘑菇漢堡', 400),
(7, 'A02', '經典漢堡', 200),
(8, 'A03', '月亮蝦餅', 100),
(9, 'A03', '綠咖哩雞肉', 400),
(10, 'A03', '泰式檸檬魚', 200);

-- --------------------------------------------------------

--
-- 資料表結構 `shopcar`
--

CREATE TABLE `shopcar` (
  `Name` varchar(15) NOT NULL,
  `Price` int(30) NOT NULL,
  `foodID` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `store`
--

CREATE TABLE `store` (
  `store_number` varchar(15) NOT NULL,
  `type` varchar(15) NOT NULL,
  `BusinessHour` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `store`
--

INSERT INTO `store` (`store_number`, `type`, `BusinessHour`) VALUES
('A01', '日式料理', '10:00-16:00'),
('A02', '美式漢堡', '10:00-14:00'),
('A03', '泰式料理', '10:00-15:00');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `comfirm`
--
ALTER TABLE `comfirm`
  ADD PRIMARY KEY (`foodID`);

--
-- 資料表索引 `foodtype`
--
ALTER TABLE `foodtype`
  ADD PRIMARY KEY (`foodID`),
  ADD KEY `store_number` (`store_number`),
  ADD KEY `foodID` (`foodID`) USING BTREE,
  ADD KEY `foodID-shopcar` (`foodID`);

--
-- 資料表索引 `shopcar`
--
ALTER TABLE `shopcar`
  ADD PRIMARY KEY (`foodID`);

--
-- 資料表索引 `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_number`);

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `comfirm`
--
ALTER TABLE `comfirm`
  ADD CONSTRAINT `foodID` FOREIGN KEY (`foodID`) REFERENCES `foodtype` (`foodID`);

--
-- 資料表的限制式 `foodtype`
--
ALTER TABLE `foodtype`
  ADD CONSTRAINT `foodtype_ibfk_1` FOREIGN KEY (`store_number`) REFERENCES `store` (`store_number`);

--
-- 資料表的限制式 `shopcar`
--
ALTER TABLE `shopcar`
  ADD CONSTRAINT `foodID-shopcar` FOREIGN KEY (`foodID`) REFERENCES `foodtype` (`foodID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
