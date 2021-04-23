const { Schema } = require('mongoose')
const { constants: { priorities } }


module.exports = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: Object.values(priorities), required: true, default: priorities.MEDIUM }
});