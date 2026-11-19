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
        lowarecase : true,
    },
    password :{
        type : String,
        required : true,
        min : 6
    },
    gender :{
        type : String,
        required : true,
        emun :['male','female','others'],
    },
    terms :{
        type : Boolean,
        default : false,
        required : true,
    },
});

module.exports = mongoose.model('User',registrationSchema);