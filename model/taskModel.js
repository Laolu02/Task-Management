const mongoose = require('mongoose')

const taskModel = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        title:{
            type: String,
            required: true
        },
        details:{
            type: String,
            required: true
        },
        deadline: {
            type: Date
        },
        category:{
            type: String,
            enum: ['Work', 'School', 'Home', 'urgent', 'Others'],
            default:'Others'
        },
        progress: {
            type: String,
            enum: ['Complete', 'Incomplete'],
            default: 'Incomplete'
        }
    }, {timestamps: true}
)

module.exports = mongoose.model('task', taskModel);