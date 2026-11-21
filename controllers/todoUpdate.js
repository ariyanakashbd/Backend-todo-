const Page = require('../models/todoCreate');

async function todoUpdate(req,res){
  let {id} = req.params;
  let update = await Page.findByIdAndUpdate({_id : id},req.body,{
    returnDocument:true,
    runValidators : true
  });
  res.json({
    success : true,
    message : update,
  });
};
module.exports = todoUpdate;