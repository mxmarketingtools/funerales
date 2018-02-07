const express = require('express');
const GaleriaController = require('../controllers/galeria');
const api = express.Router();

const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const multer = require('multer');
const uploadGaleria = multer({dest: 'uploads/galeria/', fileFilter: imageFilter, limits: { fileSize: 1000000 }});

api.get('/imagenes', GaleriaController.getImages);
api.post('/imagen/nuevo', uploadGaleria.any(), GaleriaController.nuevaImagen);
api.get('/:imageFile', GaleriaController.verImagen);
module.exports = api;