const express = require('express');
const ObituarioController = require('../controllers/obituario');
const api = express.Router();
const mdAutenticacion = require('../middlewares/autenticacion');

//Validación de subir unicamente imagenes
const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const multer = require('multer');
const upload = multer ({dest: 'uploads/obituario/', fileFilter: imageFilter});

api.get('/prueba', mdAutenticacion.verificaToken, ObituarioController.pruebas);
api.get('/busqueda/:busqueda', ObituarioController.busquedaRegistro);
api.get('/listado-obituarios/:pagina/:cantidad', ObituarioController.paginacionObituarios);
api.get('/total', ObituarioController.getTotalRegistros);
// api.post('/nuevo', upload.any(), ObituarioController.nuevoRegistro);
api.post('/nuevo', mdAutenticacion.verificaToken, ObituarioController.saveRegistro);
api.patch('/editar/:id', mdAutenticacion.verificaToken, ObituarioController.updateRegistro);
api.get('/:id', mdAutenticacion.verificaToken, ObituarioController.getRegistro);
api.delete('/eliminar/:id', mdAutenticacion.verificaToken, ObituarioController.deleteRegistro);
api.get('/', ObituarioController.getRegistros);


module.exports = api;

