CREATE TABLE `user` (
  `user_id` integer PRIMARY KEY,
  `name` varchar(255),
  `Mail` varchar(255)
);

CREATE TABLE `drop` (
  `drop_id` integer PRIMARY KEY,
  `image_url` varchar(255),
  `audio_url` varchar(255),
  `title` varchar(255),
  `date` date,
  `ref_user` int,
  `ref_precise_adress` int
);

CREATE TABLE `theme` (
  `theme_id` integer PRIMARY KEY,
  `libelle` varchar(255)
);

CREATE TABLE `adress` (
  `adress_id` integer PRIMARY KEY,
  `location` varchar(255)
);

Table "precise_adress" {
  "precise_adress_id" integer [pk]
  "lang" decimal
  "lat" decimal
  "ref_adress" integer
}

ALTER TABLE `drop` ADD FOREIGN KEY (`ref_user`) REFERENCES `user` (`user_id`);
ALTER TABLE `drop` ADD FOREIGN KEY (`ref_precise_adress`) REFERENCES `precise_adress` (`precise_adress_id`);
ALTER TABLE `precise_adress` ADD FOREIGN KEY (`ref_adress`) REFERENCES `adress` (`adress_id`);

CREATE TABLE `drop_theme` (
  `drop_theme_id` integer PRIMARY KEY,
  `ref_drop_rel` integer,
  `ref_theme_rel` integer
);

ALTER TABLE `drop_theme` ADD FOREIGN KEY (`ref_drop_rel`) REFERENCES `drop` (`drop_id`);
ALTER TABLE `drop_theme` ADD FOREIGN KEY (`ref_theme_rel`) REFERENCES `theme` (`theme_id`);
