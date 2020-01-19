const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const ConnectionSchema = new mongoose.Schema({
    socketId: String,
    techs: [String],
    coordinates: {
        latitude: Number,
        longitude: Number
    }
});

module.exports = mongoose.model('Connection', ConnectionSchema); 