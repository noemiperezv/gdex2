-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-08-2022 a las 21:18:40
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
-- Base de datos: `gdex2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2014_10_12_200000_add_two_factor_columns_to_users_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2022_05_26_053605_create_sessions_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('CT1V50L5TVrcfia4eVTLBKJAf16fZI1HVMKfRf4t', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiWlZMMjhHTDV0WDFhVkhlYkdsdzVvc1NqWjlhVFFLdW5WWEVlVktrSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9ob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjIxOiJwYXNzd29yZF9oYXNoX3NhbmN0dW0iO3M6NjA6IiQyeSQxMCRKTndmR2Q1WkpjNGNqaUttUlFOYk11eVRZdTBiVWVzRTFELnl4THlHcC5RbkRiRGROb1dkdSI7fQ==', 1654818239);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblavancetemas`
--

CREATE TABLE `tblavancetemas` (
  `cveTema` int(11) NOT NULL,
  `cveUsuario` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblavancetemas`
--

INSERT INTO `tblavancetemas` (`cveTema`, `cveUsuario`, `estado`) VALUES
(1, 6, 1),
(2, 6, 1),
(3, 6, 1),
(4, 6, 1),
(5, 6, 1),
(6, 6, 1),
(7, 6, 1),
(8, 6, 0),
(9, 6, 0),
(10, 6, 0),
(11, 6, 0),
(12, 6, 0),
(13, 6, 0),
(14, 6, 0),
(15, 6, 0),
(16, 6, 0),
(17, 6, 0),
(18, 6, 0),
(19, 6, 0),
(20, 6, 0),
(21, 6, 0),
(22, 6, 0),
(23, 6, 0),
(24, 6, 0),
(25, 6, 0),
(26, 6, 0),
(27, 6, 0),
(28, 6, 0),
(29, 6, 0),
(30, 6, 0),
(31, 6, 0),
(32, 6, 0),
(33, 6, 0),
(34, 6, 0),
(35, 6, 0),
(36, 6, 0),
(37, 6, 0),
(38, 6, 0),
(39, 6, 0),
(40, 6, 0),
(41, 6, 0),
(42, 6, 0),
(43, 6, 0),
(44, 6, 0),
(45, 6, 0),
(46, 6, 0),
(47, 6, 0),
(48, 6, 0),
(49, 6, 0),
(50, 6, 0),
(51, 6, 0),
(52, 6, 0),
(53, 6, 0),
(54, 6, 0),
(55, 6, 0),
(56, 6, 0),
(57, 6, 0),
(58, 6, 0),
(59, 6, 0),
(60, 6, 0),
(61, 6, 0),
(62, 6, 0),
(63, 6, 0),
(64, 6, 0),
(65, 6, 0),
(66, 6, 0),
(67, 6, 0),
(68, 6, 0),
(69, 6, 0),
(70, 6, 0),
(71, 6, 0),
(72, 6, 0),
(73, 6, 0),
(74, 6, 0),
(75, 6, 0),
(76, 6, 0),
(77, 6, 0),
(78, 6, 0),
(79, 6, 0),
(80, 6, 0),
(81, 6, 0),
(82, 6, 0),
(83, 6, 0),
(84, 6, 0),
(85, 6, 0),
(86, 6, 0),
(87, 6, 0),
(88, 6, 0),
(89, 6, 0),
(90, 6, 0),
(91, 6, 0),
(92, 6, 0),
(93, 6, 0),
(94, 6, 0),
(95, 6, 0),
(96, 6, 0),
(97, 6, 0),
(98, 6, 0),
(99, 6, 0),
(100, 6, 0),
(101, 6, 0),
(102, 6, 0),
(103, 6, 0),
(104, 6, 0),
(105, 6, 0),
(106, 6, 0),
(107, 6, 0),
(108, 6, 0),
(109, 6, 0),
(110, 6, 0),
(111, 6, 0),
(112, 6, 0),
(113, 6, 0),
(114, 6, 0),
(115, 6, 0),
(116, 6, 0),
(117, 6, 0),
(118, 6, 0),
(119, 6, 0),
(120, 6, 0),
(121, 6, 0),
(122, 6, 0),
(123, 6, 0),
(124, 6, 0),
(125, 6, 0),
(126, 6, 0),
(127, 6, 0),
(128, 6, 0),
(129, 6, 0),
(130, 6, 0),
(131, 6, 0),
(132, 6, 0),
(133, 6, 0),
(134, 6, 0),
(135, 6, 0),
(136, 6, 0),
(137, 6, 0),
(138, 6, 0),
(139, 6, 0),
(140, 6, 0),
(141, 6, 0),
(142, 6, 0),
(143, 6, 0),
(144, 6, 0),
(145, 6, 0),
(146, 6, 0),
(147, 6, 0),
(148, 6, 0),
(149, 6, 0),
(150, 6, 0),
(151, 6, 0),
(152, 6, 0),
(153, 6, 0),
(154, 6, 0),
(155, 6, 0),
(156, 6, 0),
(157, 6, 0),
(158, 6, 0),
(159, 6, 0),
(160, 6, 0),
(161, 6, 0),
(162, 6, 0),
(163, 6, 0),
(164, 6, 0),
(165, 6, 0),
(166, 6, 0),
(167, 6, 0),
(168, 6, 0),
(169, 6, 0),
(170, 6, 0),
(171, 6, 0),
(172, 6, 0),
(173, 6, 0),
(174, 6, 0),
(175, 6, 0),
(176, 6, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblcomentario`
--

CREATE TABLE `tblcomentario` (
  `cveComentario` smallint(6) NOT NULL,
  `comentario` varchar(500) NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  `cveUsuario` smallint(6) NOT NULL,
  `cveSeccion` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblcomentariorespuestas`
--

CREATE TABLE `tblcomentariorespuestas` (
  `cveComentario` int(11) NOT NULL,
  `cveRespuesta` int(11) NOT NULL,
  `cveUsuario` int(11) NOT NULL,
  `fechaRespuesta` date NOT NULL,
  `respuesta` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblcurso`
--

CREATE TABLE `tblcurso` (
  `cveCurso` smallint(6) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `estatus` tinyint(1) NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  `cantidadUsuarios` int(11) DEFAULT NULL,
  `rutaImagen` varchar(250) DEFAULT NULL,
  `cveUsuario` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblcurso`
--

INSERT INTO `tblcurso` (`cveCurso`, `nombre`, `descripcion`, `estatus`, `fechaRegistro`, `cantidadUsuarios`, `rutaImagen`, `cveUsuario`) VALUES
(7, 'Biología', 'Curso de bología', 1, '2022-07-14 00:00:00', 1, '', 6),
(8, 'Matemáticas', 'Curso de Matemáticas', 1, '2022-07-14 00:00:00', 1, '', 6),
(9, 'Pintura', 'Curso de pintura', 1, '2022-07-14 00:00:00', 1, '', 6),
(11, 'Base de datos', 'Curso de base de datos', 1, '2022-07-14 00:00:00', 1, '', 6),
(12, 'Bussiness Intelligence', 'Curso de BI', 1, '2022-07-14 00:00:00', 1, '', 6),
(13, 'Expresión Oral', 'Curso de EOyE', 1, '2022-07-14 00:00:00', 1, '', 6),
(14, 'Ciberseguridad', 'Curso de ciberseguridad', 1, '2022-07-14 00:00:00', 3, '', 6),
(15, 'sdlkj', 'zk<nz<lkz<m', 1, '2022-07-14 00:00:00', 0, '1657845343704.png', 6),
(16, 'slkmmd', 'zxllkxz', 1, '2022-07-14 00:00:00', 0, '1657845353961.png', 6),
(17, 'edcdxz', 'sl´lvd´ñsz', 1, '2022-07-14 00:00:00', 0, '1657846442906.png', 6),
(18, 'sdlmczdl', 'zslkljxzkzlx', 1, '2022-07-14 00:00:00', 0, '1657846591076.png', 6),
(19, 'lñsddkdlñ', 'sdajkjadokas', 1, '2022-07-14 00:00:00', 0, '1657846631657.png', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblestudiantecurso`
--

CREATE TABLE `tblestudiantecurso` (
  `cveUsuario` smallint(6) NOT NULL,
  `cveCurso` smallint(6) NOT NULL,
  `avanceCurso` decimal(10,0) DEFAULT NULL,
  `ultimoTema` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblestudiantecurso`
--

INSERT INTO `tblestudiantecurso` (`cveUsuario`, `cveCurso`, `avanceCurso`, `ultimoTema`) VALUES
(16, 7, '30', 1),
(16, 9, '90', 1),
(16, 11, '100', 1),
(6, 12, '20', 1),
(6, 13, '100', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblmaterial`
--

CREATE TABLE `tblmaterial` (
  `cveMaterial` smallint(6) NOT NULL,
  `rutaMaterial` varchar(500) NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  `cveTema` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblrol`
--

CREATE TABLE `tblrol` (
  `cveRol` smallint(6) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblrol`
--

INSERT INTO `tblrol` (`cveRol`, `nombre`, `estatus`) VALUES
(1, 'instructor', 1),
(2, 'alumno', 1),
(3, 'admin', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblseccion`
--

CREATE TABLE `tblseccion` (
  `cveSeccion` smallint(6) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `estatus` tinyint(1) NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  `cveCurso` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblseccion`
--

INSERT INTO `tblseccion` (`cveSeccion`, `nombre`, `descripcion`, `estatus`, `fechaRegistro`, `cveCurso`) VALUES
(4, 'seccion 1', 'seccion 1', 1, '2022-08-04 00:00:00', 12),
(5, 'seccion 2', 'seccion 2', 1, '2022-08-04 00:00:00', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbltema`
--

CREATE TABLE `tbltema` (
  `cveTema` smallint(6) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `estatus` tinyint(1) NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  `rutaImagen` varchar(250) DEFAULT NULL,
  `cveSeccion` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblusuario`
--

CREATE TABLE `tblusuario` (
  `cveUsuario` smallint(6) NOT NULL,
  `nombre` varchar(350) NOT NULL,
  `apellidos` varchar(400) NOT NULL,
  `matricula` varchar(10) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(500) NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  `cveRol` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblusuario`
--

INSERT INTO `tblusuario` (`cveUsuario`, `nombre`, `apellidos`, `matricula`, `email`, `password`, `fechaRegistro`, `cveRol`) VALUES
(6, 'Sandra', 'Aguayo', '1219100623', 'sandraguay31@gmail.com', '$2b$12$7tyE11HzhKXjHaryeahHGOIOWPwvEdDrd02CtluUdnr5fRqqLM/k6', '2022-07-04 00:00:00', 2),
(14, 'Soraya', 'Montenegro', '1219100627', 'soraya@gmail.com', '$2b$12$y6INR0aLATLDzkwpZ0IiJuH3O4qumMxSn1sfhHpP3lNQNKZtVaFUu', '2022-07-09 00:00:00', 1),
(15, 'Petra', 'Rosas', '1219100788', 'petra@gmail.com', '$2b$12$1wV5KFF0uglskBnKXQEv1OFqvdIcC9X6iPbOMrMvTcPeDkhBTSqPO', '2022-07-10 00:00:00', 3),
(16, 'María Mercedes', 'Gonzáles', '1219100677', 'mariag@gmail.com', '$2b$12$LmrUUply5qsMPo2ZIWkl2u/lwdYaEmXQ/FlGKHkst6gakwJC1L/Ga', '2022-07-14 00:00:00', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_team_id` bigint(20) UNSIGNED DEFAULT NULL,
  `profile_photo_path` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `current_team_id`, `profile_photo_path`, `created_at`, `updated_at`) VALUES
(1, 'Sandra', 'sandraguay31@gmail.com', NULL, '$2y$10$JNwfGd5ZJc4cjiKmRQNbMuyTYu0bUesE1D.yxLyGp.QnDbDdNoWdu', NULL, NULL, NULL, NULL, NULL, NULL, '2022-06-03 04:01:15', '2022-06-03 04:01:15');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `tblavancetemas`
--
ALTER TABLE `tblavancetemas`
  ADD PRIMARY KEY (`cveTema`);

--
-- Indices de la tabla `tblcomentario`
--
ALTER TABLE `tblcomentario`
  ADD PRIMARY KEY (`cveComentario`),
  ADD KEY `fk_cveUsuario_tblComentario` (`cveUsuario`),
  ADD KEY `fk_cveSeccion_tblComentario` (`cveSeccion`);

--
-- Indices de la tabla `tblcomentariorespuestas`
--
ALTER TABLE `tblcomentariorespuestas`
  ADD PRIMARY KEY (`cveRespuesta`);

--
-- Indices de la tabla `tblcurso`
--
ALTER TABLE `tblcurso`
  ADD PRIMARY KEY (`cveCurso`),
  ADD KEY `fk_cveUsuario_tblCurso` (`cveUsuario`);

--
-- Indices de la tabla `tblestudiantecurso`
--
ALTER TABLE `tblestudiantecurso`
  ADD KEY `fk_cveUsuario_tblEstudianteCurso` (`cveUsuario`),
  ADD KEY `fk_cveCurso_tblEstudianteCurso` (`cveCurso`);

--
-- Indices de la tabla `tblmaterial`
--
ALTER TABLE `tblmaterial`
  ADD PRIMARY KEY (`cveMaterial`),
  ADD KEY `fk_cveTema_tblMaterial` (`cveTema`);

--
-- Indices de la tabla `tblrol`
--
ALTER TABLE `tblrol`
  ADD PRIMARY KEY (`cveRol`);

--
-- Indices de la tabla `tblseccion`
--
ALTER TABLE `tblseccion`
  ADD PRIMARY KEY (`cveSeccion`),
  ADD KEY `fk_cveCurso_tblSeccion` (`cveCurso`);

--
-- Indices de la tabla `tbltema`
--
ALTER TABLE `tbltema`
  ADD PRIMARY KEY (`cveTema`),
  ADD KEY `fk_cveSeccion_tblTema` (`cveSeccion`);

--
-- Indices de la tabla `tblusuario`
--
ALTER TABLE `tblusuario`
  ADD PRIMARY KEY (`cveUsuario`),
  ADD KEY `fk_cveRol_tblUsuario` (`cveRol`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblavancetemas`
--
ALTER TABLE `tblavancetemas`
  MODIFY `cveTema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT de la tabla `tblcomentario`
--
ALTER TABLE `tblcomentario`
  MODIFY `cveComentario` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblcomentariorespuestas`
--
ALTER TABLE `tblcomentariorespuestas`
  MODIFY `cveRespuesta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblcurso`
--
ALTER TABLE `tblcurso`
  MODIFY `cveCurso` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `tblmaterial`
--
ALTER TABLE `tblmaterial`
  MODIFY `cveMaterial` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblrol`
--
ALTER TABLE `tblrol`
  MODIFY `cveRol` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tblseccion`
--
ALTER TABLE `tblseccion`
  MODIFY `cveSeccion` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbltema`
--
ALTER TABLE `tbltema`
  MODIFY `cveTema` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblusuario`
--
ALTER TABLE `tblusuario`
  MODIFY `cveUsuario` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tblcomentario`
--
ALTER TABLE `tblcomentario`
  ADD CONSTRAINT `fk_cveSeccion_tblComentario` FOREIGN KEY (`cveSeccion`) REFERENCES `tblseccion` (`cveSeccion`),
  ADD CONSTRAINT `fk_cveUsuario_tblComentario` FOREIGN KEY (`cveUsuario`) REFERENCES `tblusuario` (`cveUsuario`);

--
-- Filtros para la tabla `tblcurso`
--
ALTER TABLE `tblcurso`
  ADD CONSTRAINT `fk_cveUsuario_tblCurso` FOREIGN KEY (`cveUsuario`) REFERENCES `tblusuario` (`cveUsuario`);

--
-- Filtros para la tabla `tblestudiantecurso`
--
ALTER TABLE `tblestudiantecurso`
  ADD CONSTRAINT `fk_cveCurso_tblEstudianteCurso` FOREIGN KEY (`cveCurso`) REFERENCES `tblcurso` (`cveCurso`),
  ADD CONSTRAINT `fk_cveUsuario_tblEstudianteCurso` FOREIGN KEY (`cveUsuario`) REFERENCES `tblusuario` (`cveUsuario`);

--
-- Filtros para la tabla `tblmaterial`
--
ALTER TABLE `tblmaterial`
  ADD CONSTRAINT `fk_cveTema_tblMaterial` FOREIGN KEY (`cveTema`) REFERENCES `tbltema` (`cveTema`);

--
-- Filtros para la tabla `tblseccion`
--
ALTER TABLE `tblseccion`
  ADD CONSTRAINT `fk_cveCurso_tblSeccion` FOREIGN KEY (`cveCurso`) REFERENCES `tblcurso` (`cveCurso`);

--
-- Filtros para la tabla `tbltema`
--
ALTER TABLE `tbltema`
  ADD CONSTRAINT `fk_cveSeccion_tblTema` FOREIGN KEY (`cveSeccion`) REFERENCES `tblseccion` (`cveSeccion`);

--
-- Filtros para la tabla `tblusuario`
--
ALTER TABLE `tblusuario`
  ADD CONSTRAINT `fk_cveRol_tblUsuario` FOREIGN KEY (`cveRol`) REFERENCES `tblrol` (`cveRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
