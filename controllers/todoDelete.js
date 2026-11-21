const Page = require('../models/todoCreate');

async function todoDelete (req,res){
    let {id} = req.params;
    let deleteTodo = await Page.findByIdAndDelete(id);
    res.json({
        success :true,
        messsage : 'todo deleted'
    });
};
module.exports = todoDelete;