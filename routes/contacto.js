const express = require('express');
const ContactoController = require('../controllers/contacto');
const api = express.Router();



// api.get('/correo', GaleriaController.getImages);
api.post('/', ContactoController.correoContacto);
module.exports = api;