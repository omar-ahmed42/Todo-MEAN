const mongoose = require('mongoose')

const TodoItemSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        minlength: 2,
        maxlength: 30
    },
    description:{
        type: String,
        required: [true, 'Please provide a description'],
        minlength: 5,
        maxlength: 70
    },
    creationDate: {
        type: Date,
        required: [true, "Date cannot be null"],
        default: Date.now,
    },
    done: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    }
})


module.exports = mongoose.model('TodoItem', TodoItemSchema)
