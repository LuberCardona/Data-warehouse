var express = require('express'); 
const app = express();
const port = 3000;
app.use(express.json());


// permitir accesos desde el front - cors policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
}); 

const routerUsuarios = require("../js/routes/usuarios");

app.post('/login', routerUsuarios);

app.listen(port, function () {     
    console.log('El servidor express corre en el puerto ' + port);
});
