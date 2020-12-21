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

const routerUsuarios = require('../js/routes/usuarios');
const routerContactos = require('../js/routes/contactos');
const routerCompanias = require('../js/routes/companias');
const routerCiu_Reg_Pais = require('../js/routes/ciu_region_pais');

// ENDPOINT DE USUARIOS 
app.post('/login', routerUsuarios);
app.get('/infoUsuarios', routerUsuarios); 
app.get('/infoUsuarios/:id', routerUsuarios); // obtener por id para modificar  
app.post('/crearUsuario', routerUsuarios);
app.put('/modificarUsuario/:id', routerUsuarios); //SS
app.delete('/eliminarUsuario/:id',routerUsuarios);

// ENDPOINT DE CONTACTOS

app.get('/infoContactos', routerContactos);  // todos los contactos 
app.get('/infoContacto/:id', routerContactos);  // un contacto por id
app.post('/agregarContactoN', routerContactos);
app.put('/modificarContacto/:id', routerContactos);
app.delete('/eliminarContacto/:id',routerContactos);

//  ENDPOINTS DE companias
app.get('/infoCompanias', routerCompanias);  // todas las companias
app.get('/infoCompania/:id', routerCompanias);  // una compañia por id
app.post('/agregarCompania', routerCompanias);
app.put('/modificarCompania/:id', routerCompanias);
app.delete('/eliminarCompania/:id',routerCompanias);

// ENDPOINTS DE CIUDADES
app.get('/infoCiudades', routerCiu_Reg_Pais);  // todos las ciudades 
app.get('/infoCiudades/:paisId', routerCiu_Reg_Pais);  //  ciudades por id del Pais
app.post('/crearCiudad', routerCiu_Reg_Pais);
app.put('/modificarCiudad/:id', routerCiu_Reg_Pais);
app.delete('/eliminarCiudad/:id', routerCiu_Reg_Pais);

// ENDPOINTS DE REGIONES
app.get('/infoRegiones', routerCiu_Reg_Pais);  // todos las REGIONES 
app.get('/infoRegion/:id', routerCiu_Reg_Pais);  //  UNA REGION POR ID REGION
app.post('/crearRegion', routerCiu_Reg_Pais);
app.put('/modificarRegion/:id', routerCiu_Reg_Pais);
app.delete('/eliminarRegion/:id', routerCiu_Reg_Pais);

// ENDPOINTS DE PAISES
app.get('/infoPaises', routerCiu_Reg_Pais);  // todos los paises
app.get('/infopaises/:regionId', routerCiu_Reg_Pais);  //  paises por region id
app.post('/crearPais', routerCiu_Reg_Pais);
app.put('/modificarPais/:id', routerCiu_Reg_Pais);
app.delete('/eliminarPais/:id', routerCiu_Reg_Pais);


app.listen(port, function () {     
    console.log('El servidor express corre en el puerto ' + port);
});
