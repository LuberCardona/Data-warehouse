
// conexion puerto 5000
var express = require('express'); 
var app = express();              
app.use(express.json());
const port = 5000;

app.listen(port, function () {     
console.log('El servidor express corre en el puerto ' + port);
});


// permitir accesos desde el front - cors policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
}); 
    

