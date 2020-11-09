
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


 // USUARIOS LOGIN -  validar email y contraseña y obtener el token
app.post('/login', (req, res)=>{    
    sequelize.query ('SELECT * FROM datawarehouse.usuarios WHERE email = ? AND password = ?;',
    {replacements:[req.body.email, req.body.password],
    type: sequelize.QueryTypes.SELECT}
    ).then(result =>{ 
        console.log(result);     
        for (let i = 0; i < result.length; i++) {        
            if (result[i].email == req.body.email && result[i].password == req.body.password) {
               const payload = {
                   emailLogin: result[i].email,
                   perfilUsuario: result[i].perfil                   
               }               
                const token = jwt.sign(payload, SECRET);
                if (payload.perfilUsuario == 'Administrador'){ 
                    const payload2 = jwt.decode(token);
                    res.status(200).json({ token });
                     console.log(token)              
                           
                }else if(payload.perfilUsuario !== 'Administrador'){ 
                        const payload2 = jwt.decode(token);
                        res.status(401).json({ token });                          
                    console.log('acceso de contactos');                    
                }                    
            } 
            else if (result == '') {
                res.status(401).json('Usuario o contraseña invalidos');
                console.log('Usuario o contraseña invalidos');
            }             
        }       
    }).catch(err=>{
        res.status(500).json(err);
    })      
});

// este es solopara prueba de que la validacion del token y el perfil estuviera funcionando

app.get('/infoUsuarios', validaciones.validacionToken, validaciones.validarPerfil, (req, res)=>{        
    
    sequelize.query ('SELECT * FROM datawarehouse.usuarios;',
    {type: sequelize.QueryTypes.SELECT}
    ).then(result =>{ 
        res.status(200).json(result);
        console.log(result);
    }).catch(err=>{
        res.status(500).json(err);
    })           
})


app.listen(port, function () {     
    console.log('El servidor express corre en el puerto ' + port);
});


