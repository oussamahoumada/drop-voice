drop table IF EXISTS `user`;
drop table IF EXISTS `drop`;
drop table IF EXISTS `theme`;
drop table IF EXISTS `drop_theme`;
drop table IF EXISTS `precise_adress`;

CREATE TABLE `user` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `mail` varchar(255)
);

CREATE TABLE `drop` (
  `drop_id` integer PRIMARY KEY AUTO_INCREMENT,
  `image_url` varchar(255),
  `audio_url` varchar(255),
  `title` varchar(255),
  `date` date,
  `ref_user` int,
  `ref_precise_adress` int
);

CREATE TABLE `theme` (
  `libelle` varchar(250) PRIMARY KEY
);

CREATE TABLE `precise_adress` (
  `precise_adress_id` integer PRIMARY KEY AUTO_INCREMENT,
  `longitude` float,
  `latitude` float,
);

ALTER TABLE `drop` ADD FOREIGN KEY (`ref_user`) REFERENCES `user` (`user_id`);
ALTER TABLE `drop` ADD FOREIGN KEY (`ref_precise_adress`) REFERENCES `precise_adress` (`precise_adress_id`);
ALTER TABLE `precise_adress` ADD FOREIGN KEY (`ref_adress`) REFERENCES `adress` (`location`);

CREATE TABLE `drop_theme` (
  `drop_theme_id` integer PRIMARY KEY AUTO_INCREMENT,
  `ref_drop` integer,
  `ref_theme` varchar(250)
);

ALTER TABLE `drop_theme` ADD FOREIGN KEY (`ref_drop`) REFERENCES `drop` (`drop_id`);
ALTER TABLE `drop_theme` ADD FOREIGN KEY (`ref_theme`) REFERENCES `theme` (`libelle`);
