const mongoose = require('mongoose');
const {Schema} = mongoose;

let registrationSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
    },
    password :{
        type : String,
        required : true,
    },
    gender :{
        type : String,
        required : true,
        enum :['male','female','others'],
    },
    terms :{
        type : Boolean,
        default : false,
        required : true,
    },
    otp :{
        type : String,
        required : true,
    },
    isVerified : {
        type : Boolean,
        default : false,
    }
});

module.exports = mongoose.model('User',registrationSchema);