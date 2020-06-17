const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    address: { type: String, required: true },
    salary: { type: Number, required: true },
    age: { type: Number, required: true },
}, { collection: 'user' })

// userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
