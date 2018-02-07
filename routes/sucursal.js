var express = require('express');
var SucursalController = require('../controllers/sucursal');
var ServiciosController = require('../controllers/servicios');
var LocationController = require('../controllers/coordenadas');
var api = express.Router();


api.post('/nueva', SucursalController.saveSucursal);
api.put('/actualizar/:id', SucursalController.updateSucursal);
api.post('/upload-image/:id?', SucursalController.uploadImage);
api.get('/servicio/sucursal/:sucursal?', ServiciosController.getServicios);
api.get('/servicio/:id', ServiciosController.getServicio);
api.post('/servicio/:id', ServiciosController.saveServicio);
api.post('/location/:id', LocationController.saveLocation);
api.get('/:id', SucursalController.getSucursal);
api.get('/', SucursalController.getSucursales);

module.exports = api;
