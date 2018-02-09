var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

var app = express();

// carga de rutas
var sucursal_routes = require('./routes/sucursal');
var image_routes = require('./routes/image');
var obituario_routes = require('./routes/obituario');
var user_routes = require('./routes/user');
const galeria_routes = require('./routes/galeria');
const contacto_routes = require('./routes/contacto');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configurar Cabeceras
app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3700');
// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
// // allow preflight
// if (req.method === 'OPTIONS') {
//     res.send(200);
// } else {
//     next();
// }
// })
// ;

// rutas base
app.use('/', express.static('client', {redirect: false}))
app.use('/sucursales', sucursal_routes);
app.use('/img', image_routes);
app.use('/obituario', obituario_routes);
app.use('/usuarios', user_routes);
app.use('/galeria', galeria_routes);
app.use('/contacto', contacto_routes);

app.get('*', function (req, res, next) {
    res.sendFile(path.resolve('client/index.html'));
});

module.exports = app;