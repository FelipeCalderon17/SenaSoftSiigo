-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 27-09-2023 a las 21:11:08
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `senasoft`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `idRuta` int NOT NULL,
  `nodo_inicio` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nodo_fin` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nodo_inicio_x` varchar(45) NOT NULL,
  `nodo_inicio_y` varchar(45) NOT NULL,
  `nodo_fin_x` varchar(45) NOT NULL,
  `nodo_fin_y` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `ruta`
--

INSERT INTO `ruta` (`idRuta`, `nodo_inicio`, `nodo_fin`, `nodo_inicio_x`, `nodo_inicio_y`, `nodo_fin_x`, `nodo_fin_y`) VALUES
(5, 'Barranquilla', 'Cali', '16', '5', '8', '6'),
(6, 'Barranquilla', 'Cali', '16', '5', '8', '6'),
(7, 'BCN', 'ZAZ', '70', '110', '100', '70');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_completa`
--

CREATE TABLE `ruta_completa` (
  `idruta_completa` int NOT NULL,
  `nodo_nombre` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nodo_posicion_x` varchar(45) NOT NULL,
  `nodo_posicion_y` varchar(45) NOT NULL,
  `Ruta_idRuta` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `ruta_completa`
--

INSERT INTO `ruta_completa` (`idruta_completa`, `nodo_nombre`, `nodo_posicion_x`, `nodo_posicion_y`, `Ruta_idRuta`) VALUES
(3, 'Barranquilla', '16', '5', 6),
(4, 'Cartagena', '11', '1', 6),
(5, 'Medellin', '2', '2', 6),
(6, 'Bogota', '3', '11', 6),
(7, 'Cali', '8', '6', 6),
(8, 'BCN', '70', '110', 7),
(9, 'MAD', '10', '80', 7),
(10, 'BOG', '-70', '40', 7),
(11, 'CLO', '-70', '10', 7),
(12, 'IBZ', '60', '50', 7),
(13, 'ZAZ', '100', '70', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL,
  `email` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `codigo` varchar(256) NOT NULL,
  `verificado` tinyint(1) NOT NULL,
  `sesion_activa` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `email`, `password`, `codigo`, `verificado`, `sesion_activa`) VALUES
(44, 'calderonfelipe017@gmail.com', '$2a$07$2YCSFIY6uNP6wPBnjtNWIeaaCtEvXrRBt/di1G83Xc76Dh3GPjRPW', 'bc629d25-e6d7-4570-9626-d8e45027864c', 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`idRuta`);

--
-- Indices de la tabla `ruta_completa`
--
ALTER TABLE `ruta_completa`
  ADD PRIMARY KEY (`idruta_completa`),
  ADD KEY `fk_ruta_completa_Ruta_idx` (`Ruta_idRuta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `idRuta` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ruta_completa`
--
ALTER TABLE `ruta_completa`
  MODIFY `idruta_completa` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ruta_completa`
--
ALTER TABLE `ruta_completa`
  ADD CONSTRAINT `fk_ruta_completa_Ruta` FOREIGN KEY (`Ruta_idRuta`) REFERENCES `ruta` (`idRuta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
