-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema datawarehouse
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `datawarehouse` DEFAULT CHARACTER SET utf8 ;
USE `datawarehouse` ;

-- -----------------------------------------------------
-- Table `datawarehouse`.`compañias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`compañias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `datawarehouse`.`contatos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`contactos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellido` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `datawarehouse`.`cuidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`cuidades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `datawarehouse`.`paises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`paises` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `datawarehouse`.`regiones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`regiones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `datawarehouse`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `perfil` VARCHAR(45) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `repeat_password` VARCHAR(50) NOT NULL,  
  PRIMARY KEY (`id`))

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

/*** INSERTAR DATOS INICIALES EN LAS TABLAS***/

/*** insertar datos iniciales de usuarios***/
INSERT INTO `datawarehouse`.`usuarios`
(`id`, `Nombre`, `Apellido`, `email`, `perfil`, `password`, `repeat_password`)
VALUES
(NULL, "Ana", "Sierra", "anasierra@email.com", "Administrador", 12345678, 12345678),
(NULL, "Vanesa", "muñoz", "vanesa@email.com", "Administrador", 90123456, 90123456),
(NULL, "Yuliana", "Mesa", "yuliana@email.com", "Contactos", 78945612, 78945612),
(NULL, "Tatiana", "Castro", "tatiana@email.com", "Contactos", 34567892, 34567892);