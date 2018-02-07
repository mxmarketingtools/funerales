const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicioSchema = new Schema({
    nombre: String,
    icono: String
});

module.exports = ServicioSchema;