var Sucursal = require('../models/sucursal');
var Servicio = require('../models/sucursal-servicios');
var Imagen = require('../models/sucursal-imagenes');

function getSucursal(req, res) {
    var sucursalId = req.params.id;

    Sucursal.findById(sucursalId, (err, sucursal) => {
        if(err){
            res.status(500).send({mensaje: 'Error en la petición'});
        }else {
            if (!sucursal){
                res.status(404).send({mensaje: 'La sucursal no existe'});
            }else {
                res.status(200).send({sucursal});
            }
        }
    })
}

function getSucursales(req, res) {
    Sucursal.find({}, (err, sucursales) => {
        if(err){
            res.status(500).send({mensaje: 'Error en la petición'});
        }else{
            if(!sucursales){
                res.status(404).send({mensaje: 'No hay sucursales'});
            }else {
                Imagen.populate(sucursales, {path: 'imagen'}, (err, sucursales) => {
                    res.status(200).send({sucursales});
                });
            }
        }
    });
}

function updateSucursal(req, res) {
    const sucursalId = req.params.id;
    const params = req.body;

    Sucursal.findByIdAndUpdate(sucursalId, params, (err, sucursalUpdated) => {
        if(err){
            res.status(500).send({mensaje: 'Error en la petición'});
        }else {
            if (!sucursalUpdated) {
                res.status(404).send({mensaje: 'Error al actualizar los datos'});
            } else {
                res.status(200).send({sucursa: sucursalUpdated});
            }
        }
    })
}

function saveSucursal(req, res) {
    const sucursal = new Sucursal();
    const params = req.body;

    sucursal.nombre = params.nombre;
    sucursal.calle = params.calle;
    sucursal.numero = params.numero;
    sucursal.colonia = params.colonia;
    sucursal.cp = params.cp;
    sucursal.ciudad = params.ciudad;
    sucursal.estado = params.estado;
    sucursal.correo = params.correo;
    sucursal.telefono = params.telefono;
    sucursal.imagenes = [{titulo: 'titulo prueba', path: 'path de prueba'}];
    sucursal.servicio = [];
    sucursal.geometry = {};

    sucursal.save((err, sucursalGuardada) => {
        if (err) {
            res.status(500).send({mensaje: 'Error en la petición'});
        } else {
            if(!sucursalGuardada){
                res.status(404).send({message: 'No se ha guardado la información correctamente'});
            } else {
                res.status(200).send({sucursal: sucursalGuardada})
            }
        }
    });
}

function uploadImage(req, res) {
    var imagenId = req.params.id;
    var file_name = 'No subido...';

    if(req.files) {
        var file_path = req.files.imagen.path;
        var file_split = file_path.split('\\');
        file_name = file_split[1];

        console.log(file_path);
        console.log(file_name);
    }
}

module.exports = {
    getSucursal,
    getSucursales,
    saveSucursal,
    uploadImage,
    updateSucursal
};