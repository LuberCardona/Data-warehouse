
const sequelize = require('./conexiondb.js');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

var express = require('express'); 
var app = express();              
app.use(express.json());

const port = 5000;

 // USUARIOS LOGIN -  validar email y contraseña y obtener el token
 app.post('/login', (req, res)=>{    
    sequelize.query ('SELECT * FROM bddelilahresto.usuarios WHERE usuario = ? AND password = ?;',
    {replacements:[req.body.usuario, req.body.password],
    type: sequelize.QueryTypes.SELECT}
    ).then(result =>{ 
        console.log(result);     
        for (let i = 0; i < result.length; i++) {        
            if (result[i].usuario == req.body.usuario && result[i].password == req.body.password) {
               const payload = {
                   emailLogin: result[i].usuario,
                   perfilUsuario: result[i].idRolUsuario
               }
               const token = jwt.sign(payload, SECRET);
               res.status(200).json({ token });
               console.log(token);
            }       
        }
        if (result == '') {
            res.status(401).json('Usuario o contraseña invalidos');
            console.log('Usuario o contraseña invalidos');
        }       
    }).catch(err=>{
        res.status(500).json(err);
    })      
});



app.listen(port, function () {     
    console.log('El servidor express corre en el puerto ' + port);
});