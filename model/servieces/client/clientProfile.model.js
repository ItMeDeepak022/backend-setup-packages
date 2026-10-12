
const mongoose = require('mongoose');

const clientProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    profileImg: {
        type: String,
          
    },

    phone: {
        type: Number
    },

    DOB: {
        type: String
    },

    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },

    address: {
        type: String
    }
});

const clientProfileModel = mongoose.model('client',clientProfileSchema);

module.exports = clientProfileModel;
