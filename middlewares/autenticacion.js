const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

// Verificar TOken

exports.verificaToken = function (req, res, next) {
    const token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token Invalido',
                errors: err
            });
        }

        req.usuario = decoded.user;
        next();

    });
};

// Verificar Admin

exports.verificaAdmin = function (req, res, next) {
    var usuario = req.usuario;

    if(usuario.role === 'administrador') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'No tienes privilegios de administrador',
            errors: {message: 'No es administrador'}
        });
    }
};