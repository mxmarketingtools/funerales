const Obituario = require('../models/obituario');
const Galeria = require('../models/galeria');
const Sucursal = require('../models/sucursal');

const path = require('path');
const fs = require('fs');

function pruebas(req, res) {
    return res.status(200).send({message: 'funciona!'});
}

function nuevoRegistro(req, res) {
    params = req.body;

    if (req.files) {
        let obituario = new Obituario();
        obituario.nombre = params.nombre;
        obituario.apellidoPaterno = params.apellidoPaterno;
        obituario.apellidoMaterno = params.apellidoMaterno;
        obituario.sucursal = params.sucursal;

        var file_name = 'No subido...';
        var file_path = req.files[0].path;
        var file_split = file_path.split('/');
        file_name = file_split[1] + path.extname(req.files[0].originalname);
        var filename = (new Date).valueOf() + '-' + req.files[0].originalname;
        fs.rename(req.files[0].path, 'uploads/obituario/' + filename, (err) => {
            if (err) throw err;
        });
        obituario.imagen = file_name;

        obituario.save((err, imageStored) => {
            if (err) {
                res.status(500).send({message: 'Error en la petición'});
            } else {
                if (!imageStored) {
                    res.status(404).send({message: 'Error al actualizar Imagen'});
                } else {
                    res.status(200).send({imagen: imageStored});
                }
            }
        });
    } else {
        res.status(200).send({message: 'No se ha subido ninguna imagen'});
    }
}

function saveRegistro(req, res) {
    var registro = new Obituario();
    var params = req.body;

    registro.nombre = params.nombre;
    registro.apellidoPaterno = params.apellidoPaterno;
    registro.apellidoMaterno = params.apellidoMaterno;
    registro.sucursal = params.sucursal;
    registro.imagen = params.imagen;

    registro.save((err, nuevoRegistro) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!nuevoRegistro) {
                res.status(404).send({message: 'No fue posible agregar el registro'});
            } else {
                Galeria.populate(nuevoRegistro, {path: 'imagen'}, (err, registroConGaleria) => {
                    if (err) {
                        res.status(500).send({message: 'Error en el servidor'});
                    } else {
                        if (!registroConGaleria) {
                            res.status(404).send({message: 'Error en la petición'});
                        } else {
                            res.status(200).send({obituario: registroConGaleria});
                        }
                    }
                });
            }
        }
    })
    ;
}

function getTotalRegistros(req, res) {
    const query = Obituario.find({})
        .exec((err, registros) => {
            if (err) {
                res.status(500).send({message: 'Error en el servidor'});
            } else {
                if (!registros) {
                    res.status(404).send({message: 'Error en la petición'});
                } else {
                    let numeroRegistros = registros.length;
                    res.status(200).send({numeroRegistros: numeroRegistros});
                }
            }
        });
}

function getRegistros(req, res) {
    Obituario.find().sort({'_id': -1})
        .populate('imagen')
        .populate('sucursal', 'nombre telefono')
        .exec((err, registros) => {
            if (err) {
                res.status(500).send({message: 'Error en la petición'});
            } else {
                if (!registros) {
                    res.status(404).send({message: 'Error al consultar registros'});
                } else {
                    res.status(200).send({registros});
                }
            }
        });

    // Obituario.find({}, (err, registros) => {
    //     if(err) {
    //         res.status(500).send({message: 'Error en la petición'});
    //     } else {
    //         if (!registros) {
    //             res.status(404).send({message: 'Error al consultar registros'});
    //         } else {
    //             Sucursal.populate(registros, {path: 'sucursal', options: {select: {nombre:1, telefono:1}}},(err, registrosConSuc) =>{
    //                 res.status(200).send({registrosConSuc});
    //             });
    //         }
    //     }
    // })
}

function getRegistro(req, res) {
    var registroId = req.params.id;

    Obituario.findById(registroId)
        .populate('imagen')
        .populate('sucursal', 'nombre telefono')
        .exec((err, obituario) => {
            if (err) {
                res.status(500).send({message: 'Error en la petición'});
            } else {
                if (!obituario) {
                    res.status(404).send({message: 'Error al consultar el registro'});
                } else {
                    res.status(200).send({obituario});
                }
            }
        })
}

function updateRegistro(req, res) {
    var registroId = req.params.id;
    var update = req.body;
    console.log(req.params.id);

    Obituario.findByIdAndUpdate(registroId, update, (err, registroUpdated) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!registroUpdated) {
                res.status(404).send({message: 'Error al actualizar el registro'});
            } else {
                res.status(200).send({obituario: registroUpdated});
            }
        }
    });
}

function deleteRegistro(req, res) {
    var registroId = req.params.id;

    Obituario.findByIdAndRemove(registroId, (err, registroRemoved) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!registroRemoved) {
                res.status(404).send({message: 'Error al eliminar el registro'});
            } else {
                res.status(200).send({obituario: registroRemoved});
            }
        }
    });
}

function paginacionObituarios(req, res) {
    let cantidad = +req.params.cantidad;
    let pagina = (req.params.pagina - 1) * cantidad;


    Obituario.find({}).sort({'_id': -1})
        .populate('imagen')
        .populate('sucursal', 'nombre telefono colonia numero calle ciudad estado cp')
        .skip(pagina).limit(cantidad)
        .exec((err, resultado) => {
            res.status(200).send(resultado);
        });
}

function busquedaRegistro(req, res) {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    Obituario.find()
        .or([{'nombre': regex}, {'apellidoPaterno': regex}, {'apellidoMaterno': regex}])
        .populate('imagen')
        .populate('sucursal', 'nombre telefono colonia numero calle ciudad estado cp')
        .exec((err, registrosBuscados) => {
            if (err) {
                res.status(500).json({
                    message: 'Error en el servidor.',
                    err: err
                });
            } else {
                if (!registrosBuscados) {
                    res.status(404).json({mensaje: 'No se encontró ningun registro con esos criterios de busqueda'});
                } else {
                    res.status(200).json({resultadoBusqueda: registrosBuscados});
                }
            }
        })
}


module.exports = {
    pruebas,
    saveRegistro,
    getRegistros,
    getRegistro,
    updateRegistro,
    deleteRegistro,
    nuevoRegistro,
    paginacionObituarios,
    getTotalRegistros,
    busquedaRegistro

};