const Sucursal = require('../models/sucursal');

function saveLocation(req, res) {
    const sucursalId = req.params.id;
    const params = req.body;

    Sucursal.findById(sucursalId, (err, sucursal) => {
        if(err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if(!sucursal) {
                res.status(404).send({message: 'Error al obtener los datos'});
            } else {
                sucursal.geometry = {type: 'Point', coordinates: [params.lat, params.lng]};
                console.log(sucursal.geometry);
                sucursal.save((err, locationSucursal) => {
                    if(err) {
                        res.status(500).send({message: 'Error en la petición'});
                    } else {
                        res.status(200).send({servicio: locationSucursal});
                    }
                });
            }
        }
    });
}

module.exports = {
    saveLocation
};