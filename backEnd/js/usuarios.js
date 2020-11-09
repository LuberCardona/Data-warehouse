
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

// POST USUARIOS  - un usuario con perfil de administrador puede crear un usuario
app.post('/crearUsuario', validaciones.validacionToken, validaciones.validarPerfil, validaciones.validacionEmailYaExiste,   (req, res) => {    
    sequelsize.query('INSERT INTO `usuarios`(`Nombre`,`Apellido`,`email`,`perfil`, `password`, `repeat_password`) VALUES(?,?,?,?,?,?);',
    { replacements:[req.body.Nombre,req.body.Apellido,req.body.email,req.body.perfil, req.body.password, req.body.repeat_password],
        type: sequelize.QueryTypes.INSERT}
    ).then(result =>{
        res.send('Usuario creado');   
        console.log(result);         
    }).catch(err=>{
        res.status(500).json(err);
    })   
});

app.listen(port, function () {     
    console.log('El servidor express corre en el puerto ' + port);
});
