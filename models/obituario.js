const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObituarioSchema = new Schema({
    nombre: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Sucursal'
    },
    imagen: {type: Schema.ObjectId, ref: 'Galeria'}
},{ timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('Obituario', ObituarioSchema);