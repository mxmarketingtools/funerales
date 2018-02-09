const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var rolesValidos = {
    values: ['administrador', 'usuario'],
    message: '{VALUE} no es un rol permitido'
};

var UserSchema = new Schema({
    nombre: {type: String, required: [true, 'El nombre es necesario']},
    email:{type: String,required: [true, 'El correo es necesario'], unique: [true, 'El correo es necesario']},
    password: {type: String, required: [true, 'La contraseña es necesaria']},
    role: {type: String, required: true, default:'usuario', enum: rolesValidos}
});

UserSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe. El email debe ser único'});

module.exports = mongoose.model('User', UserSchema);