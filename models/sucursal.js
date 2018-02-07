const mongoose = require('mongoose');
const ServicioSchema = require('./sucursal-servicios');
const LocationSchema = require('./sucursal-coordenadas');
const Schema = mongoose.Schema;


var SucursalSchema = Schema({
    nombre: String,
    calle: String,
    numero: String,
    colonia: String,
    cp: Number,
    ciudad: String,
    estado: String,
    correo: String,
    telefono: String,
    imagen: [{
        type: Schema.Types.ObjectId,
        ref: 'Imagen'
    }],
    servicio: [ServicioSchema],
    geometry: LocationSchema

});


module.exports = mongoose.model('Sucursal', SucursalSchema);