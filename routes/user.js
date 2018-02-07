var express = require('express');
const UserController = require('../controllers/user.js');
var api = express.Router();
const mdAutenticacion = require('../middlewares/autenticacion');

api.post('/crear', [mdAutenticacion.verificaToken, mdAutenticacion.verificaAdmin], UserController.saveUser);
api.post('/login', UserController.signin);
api.get('/', mdAutenticacion.verificaToken, UserController.getUsuarios);
api.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaAdmin], UserController.actualizarUsuario);
api.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaAdmin], UserController.borrarUsuario);


module.exports = api;