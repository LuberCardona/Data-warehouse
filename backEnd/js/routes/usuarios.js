
const router = require("express").Router();
const validaciones = require('../../js/middlewares/validaciones');
const sequelize = require('../../js/conexiondb');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;  
const access = require('../../../../DataWarehouse/db/access_db/usuarios'); 


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


router.get('/infoUsuarios', (req, res)=>{        
    
    sequelize.query ('SELECT * FROM datawarehouse.usuarios;',
    {type: sequelize.QueryTypes.SELECT}
    ).then(result =>{ 

        res.status(200).json(result);
        console.log(result);
    }).catch(err=>{
        res.status(500).json(err);
    })           
})


//POST USUARIOS  - un usuario con perfil de administrador puede crear un usuario
router.post('/crearUsuario',validaciones.validacionEmailYaExiste, validaciones.validacionDatosUsuario,  (req, res) => {    
    sequelize.query('INSERT INTO `usuarios`(`Nombre`,`Apellido`,`email`, `perfil`, `password`) VALUES(?,?,?,?,?);',
    { replacements:[req.body.Nombre,req.body.Apellido,req.body.email,req.body.perfil, req.body.password],
        type: sequelize.QueryTypes.INSERT}
    ).then(result =>{
        res.status(200).json('Usuario Creado');         
        console.log(result);         
    }).catch(err=>{
        res.status(500).json(err);
    })   
});


router.put('/modificarUsuario/:id', validaciones.validarUsuarioExiste,(req, res) => {
    sequelize.query(
        `UPDATE usuarios SET Nombre = "${req.body.Nombre}", Apellido="${req.body.Apellido}",
        email="${req.body.email}", perfil="${req.body.perfil}", password=${req.body.password} WHERE ID = ${req.params.id};`,
        { type: sequelize.QueryTypes.UPDATE }                    
    ).then(result =>{
        res.send('Usuario modificado'); 
        console.log(result);
    }).catch(err=>{
        res.status(500).json(err);
    })  
    
});


router.delete('/eliminarUsuario/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      await access.eliminarUsuario(id);
  
      res.json({ message: "Usuario Eliminado" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;