const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    serverID: {type: String, require: true},
    date: {type: String},
    course: {type: String},
    group: {type: String},
    hour: {type: String},
    information: {type: String}
});

const model = mongoose.model('EventModels', eventSchema);

module.exports = model;