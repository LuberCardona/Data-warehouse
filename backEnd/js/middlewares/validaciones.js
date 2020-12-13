const router = require("express").Router();
const sequelize = require('../../js/conexiondb');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


const validateLogin = (req, res, next) => {
    try {
        const { email, password } = req.body;        
        if (!email || !password )
            return res.status(400).json({ error: "Datos inválidos." });
            next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Validar que el token sea verdadero - TOKEN 1 ############################
const validacionToken = (req, res, next)=>{
    try {
        const token = req.header("Authorization").split(' ')[1];
        console.log(token + 'token de header');
        jwt.verify(token, SECRET);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json('Token no válido');
    }
}
//2######################################################################
/*const validacionToken = (req, res, next)=>{
    try {
        const token = req.headers("Authorization").split(' ')[1];
        console.log(token);
        jwt.verify(token, SECRET);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json('Token no válido');
    }
}*/


// VALIDAR PERFIL DE USUARIO 1 ##########################################
const validarPerfil = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        //res.header("auth-token", token).json(token);
        console.log(token + "de perfil admin");
        const payload = jwt.decode(token);
        console.log(payload.perfilUsuario);
        if (payload.perfilUsuario == 'Administrador'){             
            next();
        }else{
            res.status(401).json('Usuario no autorizado para realizar esta acción');
        }
    } catch (error) {
        console.log(error);
    }
};
//2##############################################################
/*const validarPerfil = (req, res, next) => {
    try {
        const token = req.headers("Authorization").split(' ')[1];
        console.log(token);
        const payload = jwt.decode(token);
        if (payload.perfilUsuario == 'Administrador'){ 
            next();
        }else{
            res.status(401).json('Usuario no autorizado para realizar esta acción');
        }
    } catch (error) {
        console.log(error);
    }
};*/


// validar si email ya existe
const validacionEmailYaExiste = (req, res, next) => {
    sequelize.query ('SELECT * FROM datawarehouse.usuarios WHERE email = ?;',
    {replacements:[req.body.email],
    type: sequelize.QueryTypes.SELECT}
    ).then(result =>{       
        for (let i = 0; i < result.length; i++) {        
            if (result[i].email == req.body.email) {
             //return res.send('usuario o email ya existe'); 
             return res.status(409).json('usuario o email ya existe');
                     
            }
        }
        return next();
    }).catch(err=>{
    res.status(500).json(err);
    })   
};

const validacionDatosUsuario = (req, res, next) => {
    let {password} = req.body;
         
        if (password.length < 4){
            return res.status(401).json('La contraseña debe contener minimo 4 caracteres');           
        } 
       /* if (repeat_Password !== password) {
            return res.status(403).json({ error: 'La contraseña debe coincidir con la anterior'});            
        }*/
    return next();
        
}

const validarUsuarioExiste = (req, res, next) => {
    sequelize.query('SELECT * FROM datawarehouse.usuarios WHERE id = ?;',
       {replacements:[req.params.id], type: sequelize.QueryTypes.SELECT} 
    ).then(result =>{
      console.log(result);
        if (result == "") {
            res.send('El usuario no existe')
        }else{
            next();
        }
    }).catch(err=>{
        res.status(500).json(err);
    }) 

};


module.exports = {
    validateLogin,
    validacionToken,
    validarPerfil, 
    validacionEmailYaExiste,
    validacionDatosUsuario,
    validarUsuarioExiste
}
