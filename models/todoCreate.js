const mongoose = require('mongoose');
const {Schema} = mongoose;

let newTodo = new Schema({
    task :{
        type: String,
        required : true,
    },
    priority :{
        type : String,
        required : true,
        enum : ['None','High','Medium','Low'],

    },
    description : {
        type : String,
        required : true,
        default : '',
    },
    status :{
        type : String,
        required : true,
        enum : ['Pending','Completed'],
        default : 'Pending',
    },
},{
    timestamps : true,
});

module.exports = mongoose.model('Page',newTodo);