const sequelize = require('./conexiondb.js');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;



// Validar que el token sea verdadero - TOKEN 1 ############################
const validacionToken = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
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
        const token = req.headers.authorization.split(' ')[1];
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
            return res.send('usuario o email ya existe');
            }
        }
        return next();
    }).catch(err=>{
    res.status(500).json(err);
    })   
};

module.exports = {
    validacionToken,
    validarPerfil, 
    validacionEmailYaExiste
}
