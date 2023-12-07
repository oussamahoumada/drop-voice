-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : database-geo-voice
-- Généré le : jeu. 07 déc. 2023 à 13:54
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `geovoice_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `drop`
--

CREATE TABLE `drop` (
  `drop_id` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `audio_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `ref_user` int DEFAULT NULL,
  `ref_precise_adress` int DEFAULT NULL,
  `ref_theme` varchar(250) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `drop`
--

INSERT INTO `drop` (`drop_id`, `image_url`, `audio_url`, `title`, `date`, `ref_user`, `ref_precise_adress`, `ref_theme`) VALUES
(1, 'image.jpg', 'audio.mp3', 'ttl1', '2023-12-12', 1, 1, 'theme2'),
(2, 'image.jpg', 'audio.mp3', 'azerty', '2023-12-07', 1, 2, 'theme2'),
(3, 'image.jpg', 'audio.mp3', 'azerty', '2023-12-07', 1, 3, 'theme2'),
(4, 'image.jpg', 'audio.mp3', 'azerty', '2023-12-07', 1, 4, 'theme2');

-- --------------------------------------------------------

--
-- Structure de la table `precise_adress`
--

CREATE TABLE `precise_adress` (
  `precise_adress_id` int NOT NULL,
  `longitude` varchar(250) DEFAULT NULL,
  `latitude` varchar(250) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `precise_adress`
--

INSERT INTO `precise_adress` (`precise_adress_id`, `longitude`, `latitude`) VALUES
(1, '23.23', '22.22'),
(2, '2.2590821', '48.721504'),
(3, '2.2590655', '48.7215073'),
(4, '2.2577152', '48.726016');

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

CREATE TABLE `theme` (
  `libelle` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `theme`
--

INSERT INTO `theme` (`libelle`) VALUES
('theme2');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `name`, `mail`) VALUES
(1, 'user1', 'user1@mail.com');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `drop`
--
ALTER TABLE `drop`
  ADD PRIMARY KEY (`drop_id`),
  ADD KEY `ref_user` (`ref_user`),
  ADD KEY `ref_theme` (`ref_theme`),
  ADD KEY `ref_precise_adress` (`ref_precise_adress`);

--
-- Index pour la table `precise_adress`
--
ALTER TABLE `precise_adress`
  ADD PRIMARY KEY (`precise_adress_id`);

--
-- Index pour la table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`libelle`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `drop`
--
ALTER TABLE `drop`
  MODIFY `drop_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `precise_adress`
--
ALTER TABLE `precise_adress`
  MODIFY `precise_adress_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
