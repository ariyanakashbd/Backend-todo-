const Page = require('../models/todoCreate');

async function newCreate (req,res){
    let {task,priority,description,status} = req.body;
    if(!task){
       return res.json({
        success : false,
        message : 'please enter your task',
       });
    };

    let todoCreate = new Page({
        task : task,
        priority : priority,
        description : description,
        status : status,
    });
    await todoCreate.save();
    
    return res.json({
        success :true,
        message : 'Todo create done'
    });
};

module.exports = newCreate;