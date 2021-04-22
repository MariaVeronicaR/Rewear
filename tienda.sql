-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-05-2020 a las 00:21:57
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `precio` double NOT NULL,
  `url` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `precio`, `url`) VALUES
(1, 'Formal skirt 1', 200.5, 'https://ae01.alicdn.com/kf/HTB1_fFpIXXXXXclXFXXq6xXFXXXN/Negro-faldas-de-oficina-para-mujer-ropa-de-trabajo-Ladies-Formal-m-s-el-tama-o.jpg'),
(2, 'Bluejean', 500, 'https://http2.mlstatic.com/D_NQ_NP_664484-MLM29651431061_032019-W.jpg'),
(3, 'Black shirt', 300, 'https://m.media-amazon.com/images/I/81ufvKya4XL._SR500,500_.jpg'),
(4, 'Pink dress', 250, 'https://5.imimg.com/data5/FG/AH/XW/SELLER-45876397/cotton-modal-summer-dress-500x500.jpg'),
(5, 'Baby girl dress', 600, 'https://img.doduae.com/image/cache/catalog/reseller/1/KCD1/casual-baby-kids-fashion-children-girls%20kids-dress-dresses-clothes-clothing-2-500x500.jpg'),
(7, 'Red girl dress', 1000, 'https://www.mupkin.shop/image/cache/catalog/Partywear%20%20%20at%203.46.44%20dress-500x500.jpg'),
(15, 'Blusa', 100, 'https://www.doctorascaso.es/image/cache/data/category_3/femenino-blusas-blusa-roja-normandie-compr%C3%A1-ahora-500x500-product_popup.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(70) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `tipo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `email`, `pass`, `tipo`) VALUES
(1, 'Maria', 'Rodriguez', 'mvrm10@gmail.com', '987654321mv', 'superusuario'),
(2, 'Ivanna', 'Nouel', 'ivanna@gmail.com', '123456', 'operador'),
(3, 'ernesto', 'Becker', 'grace@gmail.com', '12345', 'administrador'),
(4, 'Ricardo', 'hernandez', 'ricardo@gmail.com', 'wally', 'administrador'),
(8, 'Aron', 'cifuentes', 'Aron@gmail.com', '123456', 'operador'),
(9, 'Andres', 'Alcala', 'mvm@gmail.com', '124', 'operador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id_venta` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`id_venta`, `id_usuario`, `fecha`, `total`) VALUES
(1, 1, '2020-04-20', 800),
(2, 4, '2020-03-20', 200.5),
(3, 1, '2020-05-18', 500),
(4, 1, '2020-05-18', 200.5),
(5, 1, '2020-05-18', 500),
(6, 1, '2020-05-18', 200.5),
(7, 1, '2020-05-18', 200.5),
(8, 1, '2020-05-18', 500),
(9, 1, '2020-05-18', 500),
(10, 1, '2020-05-18', 200.5),
(11, 1, '2020-05-18', 500),
(12, 1, '2020-05-18', 200.5),
(13, 1, '2020-05-18', 200.5),
(14, 1, '2020-05-18', 200.5),
(15, 1, '2020-05-18', 500),
(16, 1, '2020-05-18', 500),
(17, 1, '2020-05-18', 200.5),
(18, 1, '2020-05-18', 500),
(19, 1, '2020-05-18', 500),
(20, 1, '2020-05-18', 1000.5),
(21, 1, '2020-05-18', 1850),
(22, 1, '2020-05-18', 600),
(23, 1, '2020-05-18', 600),
(24, 1, '2020-05-18', 300),
(25, 1, '2020-05-18', 500),
(26, 1, '2020-05-18', 300),
(27, 1, '2020-05-18', 300),
(28, 1, '2020-05-18', 300),
(29, 1, '2020-05-18', 300),
(30, 1, '2020-05-18', 2150),
(31, 1, '2020-05-18', 1000.5),
(32, 8, '2020-05-18', 1500.5),
(33, 1, '2020-05-18', 200),
(34, 1, '2020-05-18', 20000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta_producto`
--

CREATE TABLE `venta_producto` (
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `venta_producto`
--

INSERT INTO `venta_producto` (`id_venta`, `id_producto`, `cantidad`) VALUES
(1, 2, 1),
(2, 1, 1),
(30, 4, 1),
(30, 5, 1),
(31, 2, 1),
(31, 1, 1),
(32, 3, 1),
(32, 1, 1),
(33, 7, 2),
(34, 7, 200);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  ADD KEY `id_venta` (`id_venta`),
  ADD KEY `id_producto` (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  ADD CONSTRAINT `id_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `id_venta` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id_venta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
