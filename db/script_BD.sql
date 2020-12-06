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
  `Direccion` VARCHAR(150) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `Telefono` VARCHAR(45) NOT NULL,
  `ciudad_id` INT NOT NULL,
  PRIMARY KEY (`id`),
 INDEX `fk_compañias_ciudades_idx` (`ciudad_id` ASC) VISIBLE,
  CONSTRAINT `fk_compañias_ciudades`
    FOREIGN KEY (`ciudad_id`)
    REFERENCES `datawarehouse`.`cuidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `datawarehouse`.`contatos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`contactos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellido` VARCHAR(50) NOT NULL,
  `Cargo` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `ciudad_id` INT NOT NULL,
  `compañia_id` INT NOT NULL,
  PRIMARY KEY (`id`),
   INDEX `fk_contactos_compañias_idx` (`compañia_id` ASC) VISIBLE,
  INDEX `fk_contactos_ciudades_idx` (`ciudad_id` ASC) VISIBLE,
  CONSTRAINT `fk_contactos_compañias`
    FOREIGN KEY (`compañia_id`)
    REFERENCES `datawarehouse`.`compañias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contactos_ciudades`
    FOREIGN KEY (`ciudad_id`)
    REFERENCES `datawarehouse`.`cuidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `datawarehouse`.`paises`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `datawarehouse`.`paises` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `region_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_paises_regiones_idx` (`region_id` ASC) VISIBLE,
  CONSTRAINT `fk_paises_regiones`
    FOREIGN KEY (`region_id`)
    REFERENCES `datawarehouse`.`regiones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


/*** CUIDADES**/

CREATE TABLE IF NOT EXISTS `datawarehouse`.`cuidades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `pais_id` INT NOT NULL,
  PRIMARY KEY (`id`), 
  INDEX `fk_cuidades_paises_idx` (`pais_id` ASC) VISIBLE,
  CONSTRAINT `fk_cuidades_paises`
    FOREIGN KEY (`pais_id`)
    REFERENCES `datawarehouse`.`paises` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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

/*** insertar datos de regiones***/
INSERT INTO `datawarehouse`.`regiones`
(`id`,`Nombre`)
VALUES
(NULL, "Sudamerica"),
(NULL, "Norteamerica");


/*** insertar datos de paises***/
INSERT INTO `datawarehouse`.`paises`
(`id`, `Nombre`, `region_id`)
VALUES
(NULL, "Argentina", 1),
(NULL, "Colombia", 1),
(NULL, "Chile", 1),
(NULL, "Uruguay", 1),
(NULL, "Mexico", 2),
(NULL, "Estados Unidos", 2);

/*** insertar datos de ciudades***/
INSERT INTO `datawarehouse`.`cuidades`
(`id`,`Nombre`, `pais_id`)
VALUES
(NULL, "Buenos Aires ", 1),
(NULL, "Cordoba", 1),
(NULL, "Bogota", 2),
(NULL, "Cucuta", 2),
(NULL, "Medellin", 2),
(NULL, "Cuidad de Mexico", 5),
(NULL, "Tijuana", 5);

/*** insertar datos de compañias***/
INSERT INTO `datawarehouse`.`compañias`
(`id`, `Nombre`, `Direccion`, `email`, `Telefono`, `ciudad_id`)
VALUES
(NULL, "Rappi", "cll rapi 123", "rappi@email.com", "4451123456", 1),
(NULL, "Mimos", "cll mimos 456", "mimos@email.com", "5511112333", 2),
(NULL, "Globant", "cll globant 78-89", "globant@email.com", "5745555555", 3),
(NULL, "Mercado libre", "cll libre 12-45", "libre@email.com", "5541231245", 4),
(NULL, "Exito", "cll exito 24-18", "exito@email.com", "5715554444", 5);



/*** insertar datos de contactos***/
INSERT INTO `datawarehouse`.`contactos`
(`id`, `Nombre`, `Apellido`, `Cargo`, `email`, `ciudad_id`, `compañia_id`)
VALUES
(NULL, "Camila", "Panto", "UX Designer", "camila@emai.com", 1, 1),
(NULL, "Agustin", "Soria", "UI Designer", "agustin@email.com", 2, 2),
(NULL, "Milena", "Soria", "Developer", "milena@email.com", 3, 3),
(NULL, "Milena", "Soria", "Developer", "milena@email.com", 6, 4),
(NULL, "Milena", "Soria", "Developer", "milena@email.com", 4, 4),
(NULL, "Milena", "Soria", "Developer", "milena@email.com", 7, 4),
(NULL, "Milena", "Soria", "Developer", "milena@email.com", 5, 5);








