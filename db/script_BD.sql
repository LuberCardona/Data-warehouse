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
CREATE TABLE IF NOT EXISTS `datawarehouse`.`contatos` (
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
-- Table `datawarehouse`.`perfiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`perfiles` (
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
  `password` VARCHAR(50) NOT NULL,
  `perfil_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_perfil_idx` (`perfil_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_perfil`
    FOREIGN KEY (`perfil_id`)
    REFERENCES `datawarehouse`.`perfiles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

/*** INSERTAR DATOS INICIALES EN LAS TABLAS***/

/*** insertar opciones de los perfiles de usuario***/
INSERT INTO `datawarehouse`.`perfiles`
(`id`, `Nombre`)
VALUES
(NULL, "Administrador"),
(NULL, "Contactos");


/*** insertar datos iniciales de usuarios***/
INSERT INTO `datawarehouse`.`usuarios`
(`id`, `Nombre`, `Apellido`, `email`)
VALUES
(NULL, "Ana", "Sierra", "anasierra@email.com", 1),
(NULL, "Vanesa", "muñoz", "vanesa@email.com", 1),
(NULL, "Yuliana", "Mesa", "yuliana@email.com", 2),
(NULL, "Tatiana", "Castro", "tatiana@email.com", 2);