const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;



function saveUser(req, res) {
    const body = req.body;
    var user = new User({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, user) => {
        if (err) {
            res.status(400).json({
                message: 'Error en la petición',
                err: err
            });
        } else {
            if (!user) {
                res.status(404).send({message: 'Error al guardar los datos en el servidor'});
            } else {
                res.status(201).json({
                    ok: true,
                    usuario: user,
                    tokenUsuario: req.usuario
                });
            }
        }
    });
}

function signin(req, res) {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!user) {
                res.status(401).send({message: 'Datos de autentificación incorrectos'});
            } else {
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    res.status(401).send({message: 'Datos de autentificación incorrectos'});
                } else {
                    user.password = ':)';
                    const token = jwt.sign({user: user}, SEED, {expiresIn: 28800})// 8 horas;
                    res.status(200).json({
                        ok: true,
                        usuario: user,
                        token: token,
                        userId: user._id
                    });
                }
            }
        }
    });
}

function actualizarUsuario(req, res) {
    const id = req.params.id;
    const body = req.body;

    User.findById(id, (err, usuario) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error en la petición',
                err: err
            });
        } else {
            if (!usuario) {
                res.status(400).json({
                    ok: false,
                    message: 'El usuario no existe',
                    err: {message: 'No existe un ususario con ese ID'}
                });
            } else {
                usuario.nombre = body.nombre;
                usuario.email = body.email;
                usuario.role = body.role;

                usuario.save((err, usuarioGuardado) => {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            message: 'Error en la petición',
                            err: err
                        });
                    } else {
                        usuarioGuardado.password = ':)'
                        res.status(200).json({
                            ok: true,
                            usuario: usuarioGuardado
                        })
                    }
                });
            }
        }
    });

}

function getUsuarios(req, res) {
    User.find({}, 'nombre email role').sort({'_id': -1}).exec((err, usuarios) => {
        if (err) {
            res.status(500).json({
                message: 'Error en la petición',
                err: err
            });
        } else {
            if (!usuarios) {
                res.status(404).json({
                    message: 'No se encontraron registros'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            }
        }
    });
}

function borrarUsuario(req, res) {
    const id = req.params.id;

    User.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error en la petición',
                err: err
            });
        } else {
            if (!usuarioBorrado) {
                res.status(400).json({
                    ok:false,
                    message: 'No existe un registro con ese ID',
                    err: {message: 'No se ha encontrado un registro con ese ID'}
                })
            } else {
                res.status(200).json({
                    ususarios: usuarioBorrado
                });
            }
        }
    })

}

module.exports = {
    saveUser,
    getUsuarios,
    signin,
    actualizarUsuario,
    borrarUsuario
};