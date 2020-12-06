
const router = require("express").Router();
const validaciones = require('../../js/middlewares/validaciones');
const sequelize = require('../../js/conexiondb');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;   


 // USUARIOS LOGIN -  validar email y contraseña y obtener el token
 router.post('/login', validaciones.validateLogin, (req, res)=>{         
    sequelize.query ('SELECT * FROM datawarehouse.usuarios WHERE email = ? AND password = ?;',
    {replacements:[req.body.email, req.body.password],
    type: sequelize.QueryTypes.SELECT}
    ).then(result =>{ 
        console.log(result);    
        if(result == ""){
            res.status(400).json({ error: "Usuario o contraseña inválidos." });
        }  
        for (let i = 0; i < result.length; i++) {        
            if (result[i].email == req.body.email && result[i].password == req.body.password) {
               const payload = {
                   emailLogin: result[i].email,
                   perfilUsuario: result[i].perfil                   
               }               
                const token = jwt.sign(payload, SECRET);
                res.header("auth-token", token).json(token);
            }else {
                res.status(400).json({ error: "Acceso denegado." });
            }
                           
        }       
    }).catch(err=>{
        res.status(500).json(err);
    })  
       
});

module.exports = router;

// este es solopara prueba de que la validacion del token y el perfil estuviera funcionando

/*app.get('/infoUsuarios', validaciones.validacionToken, validaciones.validarPerfil, (req, res)=>{        
    
    sequelize.query ('SELECT * FROM datawarehouse.usuarios;',
    {type: sequelize.QueryTypes.SELECT}
    ).then(result =>{ 
        res.status(200).json(result);
        console.log(result);
    }).catch(err=>{
        res.status(500).json(err);
    })           
})*/

// POST USUARIOS  - un usuario con perfil de administrador puede crear un usuario
/*app.post('/crearUsuario', validaciones.validacionToken, validaciones.validarPerfil, validaciones.validacionEmailYaExiste,   (req, res) => {    
    sequelsize.query('INSERT INTO `usuarios`(`Nombre`,`Apellido`,`email`,`perfil`, `password`, `repeat_password`) VALUES(?,?,?,?,?,?);',
    { replacements:[req.body.Nombre,req.body.Apellido,req.body.email,req.body.perfil, req.body.password, req.body.repeat_password],
        type: sequelize.QueryTypes.INSERT}
    ).then(result =>{
        res.send('Usuario creado');   
        console.log(result);         
    }).catch(err=>{
        res.status(500).json(err);
    })   
});*/
