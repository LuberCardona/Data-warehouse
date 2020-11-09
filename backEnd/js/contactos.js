
var express = require('express'); 
var app = express();              
app.use(express.json());
const port = 3000;

const validaciones = require('./validaciones');
const sequelize = require('./conexiondb.js');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;   

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
}); 

// POST CONTACTOS - el usuario con perfil de administrador puede crear un CONTACTO













app.listen(port, function () {     
    console.log('El servidor express corre en el puerto ' + port);
});
















