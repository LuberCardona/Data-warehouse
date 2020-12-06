
const router = require("express").Router();
const validaciones = require('../../js/middlewares/validaciones');
const sequelize = require('../../js/conexiondb');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

// POST CONTACTOS - el usuario con perfil de administrador puede crear un CONTACTO

























