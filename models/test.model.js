const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   images : [{public_id: String, url: String}]
})

module.exports = mongoose.model('Test', TestSchema);