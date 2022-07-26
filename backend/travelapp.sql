-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-07-2022 a las 01:45:59
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `travelapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activities`
--

CREATE TABLE `activities` (
  `group_id` int(11) NOT NULL,
  `activity_index` tinyint(4) NOT NULL,
  `activity_type` tinyint(4) NOT NULL,
  `agent` int(11) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `time_start` time DEFAULT NULL,
  `time_end` time DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity_group`
--

CREATE TABLE `activity_group` (
  `id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `time_start` time DEFAULT NULL,
  `time_end` time DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agents`
--

CREATE TABLE `agents` (
  `id` int(11) NOT NULL,
  `agent_type` enum('0','1','2') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `agents`
--

INSERT INTO `agents` (`id`, `agent_type`) VALUES
(1, '0'),
(2, '1'),
(3, '1'),
(4, '1'),
(5, '1'),
(6, '1'),
(7, '1'),
(8, '1'),
(9, '1'),
(10, '1'),
(11, '1'),
(12, '2'),
(13, '2'),
(14, '2'),
(15, '2'),
(16, '2'),
(17, '2'),
(18, '2'),
(19, '2'),
(20, '2'),
(21, '2'),
(22, '2'),
(23, '2'),
(24, '2'),
(25, '2'),
(26, '2'),
(27, '2'),
(28, '2'),
(29, '2'),
(30, '0'),
(31, '0'),
(32, '0'),
(33, '0'),
(34, '0'),
(35, '0'),
(36, '0'),
(37, '1'),
(38, '0'),
(39, '1'),
(40, '0'),
(41, '0'),
(42, '0'),
(43, '0'),
(44, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concept_invoice`
--

CREATE TABLE `concept_invoice` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `activity_index` tinyint(4) NOT NULL,
  `activity_type` tinyint(4) NOT NULL,
  `invoice` int(11) DEFAULT NULL,
  `amount` float NOT NULL,
  `concept` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`details`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventory_items`
--

CREATE TABLE `inventory_items` (
  `id` int(11) NOT NULL,
  `agent` int(11) DEFAULT NULL,
  `type` enum('1','2','3','4','5') COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `hidden` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `inventory_items`
--

INSERT INTO `inventory_items` (`id`, `agent`, `type`, `data`, `hidden`) VALUES
(1, 2, '1', '[\"nuevo nomqwrW\",238603,\"direccion 5, destino 1, pais 3\",[620953756],[\"\\r\\n    leonard.lubowitz@gmail.com\",\"\\r\\n    christiansen.derrick@gmail.com\"]]', 0),
(2, 3, '1', '[\"empresa 2SDFASD\",238497,\"direccion 7, destino 2, pais 3\",[602210361],[\"\\r\\n    ondricka.carmelo@hotmail.com\",\"\\r\\n    heller.margie@gmail.com\"]]', 0),
(3, 4, '1', '[\"Nuevo nombre\",122959,\"direccion 8, destino 4, pais 5\",[605841887],[\"\\r\\n    lerdman@gmail.com\",\"yost.garnet@roob.com\"]]', 0),
(4, 5, '1', '[\"empresa 2345235\",683081,\"direccion 3, destino 3, pais 5\",[673552823],[\"\\r\\n    ikoelpin@yahoo.com\",\"\\r\\n    gayle.schuppe@gmail.com\"]]', 0),
(5, 6, '1', '[\"empresa 5\",711137,\"direccion 4, destino 4, pais 2\",[626786609],[\"\\r\\n    louie.hettinger@heidenreich.com\",\"\\r\\n    kassulke.eryn@witting.com\"]]', 0),
(6, 7, '1', '[\"empresa 6\",290219,\"direccion 2, destino 1, pais 3\",[654343543],[\"\\r\\n    edgar68@schamberger.com\",\"\\r\\n    ikoelpin@yahoo.com\"]]', 0),
(7, 8, '1', '[\"empresa 7\",722995,\"direccion 10, destino 1, pais 4\",[664860788],[\"\\r\\n    liana04@hackett.biz\",\"\\r\\n    kprohaska@hotmail.com\"]]', 0),
(8, 9, '1', '[\"empresa 8\",433074,\"direccion 8, destino 1, pais 5\",[670774924],[\"\\r\\n    leonard.lubowitz@gmail.com\",\"\\r\\n    qjohns@gmail.com\"]]', 0),
(9, 10, '1', '[\"empresa 9\",942149,\"direccion 9, destino 5, pais 1\",[664671505],[\"\\r\\n    kirlin.ashton@yahoo.com\",\"\\r\\n    alueilwitz@yahoo.com\"]]', 0),
(10, 11, '1', '[\"empresa 10\",183324,\"direccion 3, destino 2, pais 2\",[609551087],[\"\\r\\n    kassulke.eryn@witting.com\",\"\\r\\n    edgar68@schamberger.com\"]]', 0),
(11, 12, '2', '[\"Kim, apellido 1 apellido 2\",545412,[648614727],[\"\\r\\n    xlakin@yahoo.com\"],3,1]', 0),
(12, 13, '2', '[\"Noor, apellido 1 apellido 2\",331427,[663812236],[\"\\r\\n    cali26@metz.net\"],3,2]', 0),
(13, 14, '2', '[\"Anita, sdfgsdg\",487569,[627511289],[\"\\r\\n    toni81@yahoo.com\"],2,1]', 0),
(14, 15, '2', '[\"Ba, afasdfds\",998360,[699757019],[\"\\r\\n    marion77@hotmail.com\"],2,1]', 0),
(15, 16, '2', '[\"Caris, apellido 1 apellido 2\",988098,[684699904],[\"\\r\\n    mafalda.marvin@gmail.com\"],1,2]', 0),
(16, 17, '2', '[\"Kala, apellido 1 apellido 2\",203637,[635048912],[\"\\r\\n    ondricka.carmelo@hotmail.com\"],3,2]', 0),
(17, 18, '2', '[\"Baz, apellido 1 apellido 2\",513885,[690563633],[\"\\r\\n    lebsack.duane@hotmail.com\"],2,2]', 0),
(18, 1, '4', '[\"tour 1\",\"07:00\",\"17:30\",1,\"destino 5\"]', 0),
(19, 1, '4', '[\"tour 2\",\"08:00\",\"13:30\",1,\"destino 5\"]', 0),
(20, 1, '4', '[\"tour 3\",\"07:30\",\"19:30\",2,\"destino 5\"]', 0),
(21, 1, '4', '[\"dfgsedrgf\",\"10:00\",\"19:00\",2,\"destino 5\"]', 0),
(22, 1, '4', '[\"tour 5\",\"12:00\",\"20:30\",1,\"destino 1\"]', 0),
(23, 1, '4', '[\"tour 6\",\"11:30\",\"14:00\",2,\"destino 5\"]', 0),
(24, 1, '4', '[\"tour 7\",\"12:00\",\"14:00\",2,\"destino 2\"]', 0),
(25, 1, '4', '[\"tour 8\",\"11:00\",\"19:00\",2,\"destino 3\"]', 0),
(26, 1, '4', '[\"tour 9\",\"10:30\",\"20:00\",2,\"destino 4\"]', 0),
(27, 1, '4', '[\"tour 10\",\"09:00\",\"13:30\",2,\"destino 5\"]', 0),
(28, 1, '4', '[\"tour 11\",\"07:00\",\"17:00\",1,\"destino 5\"]', 0),
(29, 1, '4', '[\"tour 12\",\"09:30\",\"17:30\",1,\"destino 3\"]', 0),
(30, 1, '4', '[\"tour 13\",\"07:00\",\"20:30\",2,\"destino 2\"]', 0),
(31, 1, '4', '[\"tour 14\",\"08:30\",\"17:30\",1,\"destino 5\"]', 0),
(32, 1, '3', '[\"hotel 1\",1,3,[\"piscina\",\"restaurante\",\"jardin\",\"wifi\"],\"direccion 5, destino 3, pais 5\",5,[629823287],[\"\\r\\n    hartmann.arvilla@bode.info\"]]', 0),
(33, 1, '3', '[\"sdfgasdgf\",1,1,\"restaurante\",\"direccion 3, destino 5, pais 1\",5,[618856494],[\"\\r\\n    edd.jakubowski@schowalter.biz\"]]', 0),
(34, 1, '3', '[\"hotel 3\",1,4,[\"restaurante\",\"wifi\"],\"direccion 6, destino 3, pais 1\",1,[624742663],[\"\\r\\n    edgar68@schamberger.com\"]]', 0),
(35, 1, '3', '[\"hotel 4\",3,null,[\"restaurante\",\"wifi\"],\"direccion 9, destino 2, pais 1\",7,[690339591],[\"\\r\\n    orion96@hotmail.com\"]]', 0),
(36, 1, '3', '[\"hotel 5\",2,null,[\"jardin\",\"wifi\"],\"direccion 2, destino 3, pais 3\",7,[604041936],[\"\\r\\n    dach.joany@gmail.com\"]]', 0),
(37, 1, '3', '[\"hotel 6\",1,4,[\"piscina\",\"restaurante\"],\"direccion 9, destino 4, pais 5\",5,[619777725],[\"\\r\\n    kgleichner@gmail.com\"]]', 0),
(38, 1, '3', '[\"hotel 7\",1,5,\"piscina\",\"direccion 9, destino 4, pais 5\",6,[669754976],[\"\\r\\n    liana04@hackett.biz\"]]', 0),
(39, 1, '5', '[\"paquete 1\",7,[\"destino 2\",\"destino 3\"]]', 0),
(40, 1, '5', '[\"paquete 2\",5,\"destino 1\"]', 0),
(41, 1, '5', '[\"paquete 3\",6,\"destino 5\"]', 0),
(42, 1, '5', '[\"paquete 4\",5,[\"destino 1\",\"destino 2\"]]', 0),
(43, 1, '5', '[\"paquete 5\",3,[\"destino 3\",\"destino 5\"]]', 0),
(44, 1, '5', '[\"paquete 6\",5,[\"destino 3\",\"destino 5\"]]', 0),
(45, 1, '5', '[\"paquete 7\",6,\"destino 5\"]', 0),
(46, 1, '5', '[\"paquete 8\",5,\"destino 2\"]', 0),
(47, 1, '5', '[\"paquete 9\",5,\"destino 4\"]', 0),
(48, 30, '1', '[\"aere\",\"WER\",\"er\",[\"ERe\"],[\"WERWER\"]]', 0),
(49, 31, '1', '[\"aerw\",\"EWR\",\"wer\",[\"werer\"],[\"EWR\"]]', 0),
(50, 32, '1', '[\"awretqw\",\"qertw5y\",\"q5yw456\"]', 0),
(51, 33, '1', '[\"aeraw\",\"artaet\"]', 0),
(52, 34, '1', '[\"EWRQW\",\"qer\",\"q\"]', 0),
(53, 35, '1', '[\"ERW\",\"ARTQ\",\"WRTQRE\"]', 0),
(54, 36, '1', '[\"asrt\",\"qwrt\",\"awert\",[\"awtrqwrt\"]]', 0),
(56, 37, '2', '[\"aer\",\"ER\",null,null,1,1]', 0),
(57, 1, '4', '[\"EART\",\"05:00\",\"05:25\",\"5\",\"ASRTEWR\"]', 0),
(58, 38, '1', '[\"aer\",\"ertwert\",\"qwe\",[\"qwrt\"],[\"qwretqwe\"]]', 0),
(59, 39, '2', '[\"asrte\",\"arte\",null,null,1,1]', 0),
(60, 1, '3', '[\"aert\",2,null,null,\"afsg\",5,[\"dfgsfdg\"]]', 0),
(61, 1, '3', '[\"SRTQW\",1,null,null,\"ARTE\"]', 0),
(62, 40, '1', '[\"rtyert\",\"qwetr\",\"qwertqwt\",[\"qwtqrt\"]]', 0),
(63, 41, '1', '[\"ETRQWTR\",\"QWRTQWE\",\"QERTERT\"]', 0),
(64, 42, '1', '[\"setrw\",\"eytwer\",\"etywety\"]', 0),
(65, 43, '1', '[\"erqw\",\"waretqwe\",\"WETRQW\",[\"QWTRQW\"],[\"WTEQRT\"]]', 0),
(66, 44, '1', '[\"SGFD\",\"ADFGSD\",\"ASDGA\",[\"ASDGASD\"]]', 0),
(67, 1, '3', '[\"SDFASDG\",1,null,null,\"sdfdsa\",66,[\"sdgfasd\"]]', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `document_id` int(11) DEFAULT NULL,
  `payment_type` tinyint(1) NOT NULL,
  `document_type` tinyint(4) NOT NULL,
  `document_date` date DEFAULT NULL,
  `amount` float NOT NULL,
  `paid` float NOT NULL,
  `currency` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `concepto` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payer` int(11) DEFAULT NULL,
  `charger` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `passengers`
--

CREATE TABLE `passengers` (
  `group_id` int(11) NOT NULL,
  `activity_index` tinyint(4) NOT NULL,
  `activity_type` tinyint(4) NOT NULL,
  `event_ref` int(11) NOT NULL,
  `pax` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`pax`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`group_id`,`activity_index`,`activity_type`),
  ADD KEY `agent` (`agent`);

--
-- Indices de la tabla `activity_group`
--
ALTER TABLE `activity_group`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `concept_invoice`
--
ALTER TABLE `concept_invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`,`activity_index`,`activity_type`),
  ADD KEY `invoice` (`invoice`);

--
-- Indices de la tabla `inventory_items`
--
ALTER TABLE `inventory_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agent` (`agent`);

--
-- Indices de la tabla `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payer` (`payer`),
  ADD KEY `charger` (`charger`);

--
-- Indices de la tabla `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`group_id`,`activity_index`,`activity_type`,`event_ref`),
  ADD KEY `event_ref` (`event_ref`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activity_group`
--
ALTER TABLE `activity_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `concept_invoice`
--
ALTER TABLE `concept_invoice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventory_items`
--
ALTER TABLE `inventory_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `activity_group` (`id`),
  ADD CONSTRAINT `activities_ibfk_2` FOREIGN KEY (`agent`) REFERENCES `agents` (`id`);

--
-- Filtros para la tabla `concept_invoice`
--
ALTER TABLE `concept_invoice`
  ADD CONSTRAINT `concept_invoice_ibfk_1` FOREIGN KEY (`group_id`,`activity_index`,`activity_type`) REFERENCES `activities` (`group_id`, `activity_index`, `activity_type`),
  ADD CONSTRAINT `concept_invoice_ibfk_2` FOREIGN KEY (`invoice`) REFERENCES `invoices` (`id`);

--
-- Filtros para la tabla `inventory_items`
--
ALTER TABLE `inventory_items`
  ADD CONSTRAINT `inventory_items_ibfk_1` FOREIGN KEY (`agent`) REFERENCES `agents` (`id`);

--
-- Filtros para la tabla `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`payer`) REFERENCES `agents` (`id`),
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`charger`) REFERENCES `agents` (`id`);

--
-- Filtros para la tabla `passengers`
--
ALTER TABLE `passengers`
  ADD CONSTRAINT `passengers_ibfk_1` FOREIGN KEY (`group_id`,`activity_index`,`activity_type`) REFERENCES `activities` (`group_id`, `activity_index`, `activity_type`),
  ADD CONSTRAINT `passengers_ibfk_2` FOREIGN KEY (`event_ref`) REFERENCES `activity_group` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
