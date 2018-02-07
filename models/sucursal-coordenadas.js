const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    type: { type: String, default: 'Point'},
    coordinates: {type: [Number], index: '2d'}
});

module.exports = LocationSchema;