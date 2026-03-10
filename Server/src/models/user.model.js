const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{ 
        type: String, 
        required: true, 
        unique: [true, 'Username already exists']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists'],
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;