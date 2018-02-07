const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SucursalImagenesSchema = new Schema({
    title: String,
    picture: String,
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Sucursal'
    },
});

module.exports = mongoose.model('Imagen', SucursalImagenesSchema);