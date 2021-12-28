-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema NaplessRabbit
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema NaplessRabbit
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `NaplessRabbit` DEFAULT CHARACTER SET utf8 ;
USE `NaplessRabbit` ;

-- -----------------------------------------------------
-- Table `NaplessRabbit`.`deliveryfreq_by_time_area`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NaplessRabbit`.`deliveryfreq_by_time_area` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `time` INT NOT NULL,
  `delivery_freq` INT NOT NULL,
  `area1_City_Do` VARCHAR(45) NOT NULL,
  `area2_Si_Gun_Gu` VARCHAR(45) NOT NULL,
  `area3_Dong` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NaplessRabbit`.`weather`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NaplessRabbit`.`weather` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `time` INT NOT NULL,
  `area1_City_Do` VARCHAR(45) NOT NULL,
  `area2_Si_Gun_Gu` VARCHAR(45) NOT NULL,
  `area3_Dong` VARCHAR(45) NOT NULL,
  `temperature` INT NULL,
  `rain(mm)` FLOAT NULL,
  `snow(cm)` FLOAT NULL,
  `dust` FLOAT NULL,
  `weather_alert` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NaplessRabbit`.`Corona_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NaplessRabbit`.`Corona_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `area1_City_Do` VARCHAR(45) NOT NULL,
  `area2_Si_Gun_Gu` VARCHAR(45) NULL,
  `area3_Dong` VARCHAR(45) NULL,
  `distancing_level` INT NULL,
  `restrict_time` INT NULL,
  `restrict_headcount` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NaplessRabbit`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NaplessRabbit`.`user` (
  `id` VARCHAR(128) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `name` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
