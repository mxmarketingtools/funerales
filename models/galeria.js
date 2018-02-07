const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GaleriaSchema = Schema({
    imagen: String
});

module.exports = mongoose.model('Galeria', GaleriaSchema);