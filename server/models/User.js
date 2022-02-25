const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const {Schema} = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Please provide a name`],
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide an email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
// add Item[] to User Schema
});

UserSchema.pre('save', async function (){
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.comparePassword = async function (providedPassword){
    const isMatch = await bcrypt.compare(providedPassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', UserSchema)