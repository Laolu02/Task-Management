const mongoose = require('mongoose')

const userModel = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        email:{
            type: String,
            requuired: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        }
    }, {timestamps: true}
)
module.exports = mongoose.model('user', userModel);