const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userInfoSchema = new Schema({
    _user: { type: String, required: true },
    details: { type: String, required: true },
    rating: { type: Number, required: true }
}, { collection: 'user_info' })
module.exports = mongoose.model('UserInfo', userInfoSchema)
