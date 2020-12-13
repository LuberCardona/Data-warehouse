var express = require('express'); 
const app = express();
const port = 3000;
app.use(express.json());


const helmet = require('helmet');
app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type"}));

// permitir accesos desde el front - cors policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
}); 

// ROUTER
const routerUsuarios = require("../js/routes/usuarios");


// ENDPOINT DE USUARIOS 
/*app.use('/usuarios', routerUsuarios);*/

app.post('/login', routerUsuarios);
app.get ('/infoUsuarios', routerUsuarios); // obtener usuarios
app.post('/crearUsuario', routerUsuarios);
app.put ('/modificarUsuario/:id', routerUsuarios);
app.put ('/eliminarUsuario/:id',routerUsuarios);

// ENDPOINT DE CONTACTOS









app.listen(port, function () {     
    console.log('El servidor express corre en el puerto ' + port);
});
