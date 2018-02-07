var Sucursal = require('../models/sucursal');

function getServicios(req, res) {
    var sucursalId = req.params.sucursal;

    if(!sucursalId) {
        //sacar los servicios de bd
       var find = Servicios.find({}).sort('-nombre');
    } else {
        //sacar los servicios de una sucursal
       var find = Servicios.find({sucursal: sucursalId}).sort('-nombre');
    }

    find.exec((err, servicios) => {
        if(err) {
            res.status(500).send({mensaje: err});
        }else {
            if(!servicios) {
                res.status(404).send({mensaje: 'Esta sucursal no tiene servicios'});
            } else {
                res.status(200).send({servicios: servicios});
            }
        }
    });
}

function getServicio(req, res) {
    var servicioId = req.params.id;

    Servicios.findById(servicioId, (err, servicio) => {
       if(err) {
           res.status(500).send({mensaje: 'Error en la petición'});
       } else {
           if(!servicio) {
               res.status(404).send({mensaje: 'No se encontró el servicio'});
           } else{
               Sucursal.populate(servicio, {path: 'sucursal'}, (err, servicio) => {
                   if(err) {
                       res.status(500).send({mensaje: 'Error en la petición'});
                   } else {
                       res.status(200).send({servicio: servicio});
                   }
               });
           }
       }
    });
}

function saveServicio(req, res) {
    const sucursalId = req.params.id;
    const params = req.body;

    Sucursal.findById(sucursalId, (err, sucursal) => {
       if(err) {
           res.status(500).send({message: 'Error en la petición'});
       } else {
           if(!sucursal) {
               res.status(404).send({message: 'Error al obtener los datos'});
           } else {
               sucursal.servicio.push({nombre: params.nombre, icono: params.icono});
               sucursal.save((err, servicioSucursal) => {
                       if(err) {
                           res.status(500).send({message: 'Error en la petición'});
                       } else {
                           res.status(200).send({servicio: servicioSucursal});
                       }
               });
           }
       }
    });


    // const servicios = new Servicios();
    //
    // const params = req.body;
    // servicios.nombre = params.nombre;
    //
    // servicios.save((err, servicioGuardado) => {
    //     if (err) {
    //         res.status(500).send({mensaje: 'Error en la petición'});
    //     } else {
    //         if(!servicioGuardado){
    //             res.status(404).send({message: 'No se ha guardado la información correctamente'});
    //         } else {
    //             res.status(200).send({servicios: servicioGuardado});
    //         }
    //     }
    // });
}

module.exports = {
    saveServicio,
    getServicio,
    getServicios
};