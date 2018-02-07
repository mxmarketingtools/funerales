var express = require('express');
var ImagenController = require('../controllers/image');
var api = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'})

api.get('/prueba-imagen', ImagenController.pruebas);
api.get('/image/:id', ImagenController.getImage);
api.get('/images/:sucursal?', ImagenController.getImages);
api.post('/image', ImagenController.saveImage);
api.put('/image/:id', ImagenController.updateImage);
api.delete('/image/:id', ImagenController.deleteImage);
api.post('/upload-image/:id', multipartMiddleware, ImagenController.uploadImage);
api.get('/get-image/:imageFile', multipartMiddleware, ImagenController.getImageFile);

module.exports = api;