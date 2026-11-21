const Page = require('../models/todoCreate');

async function read (req,res,){
    let alldata = await Page.find({});
    res.json({
        success :true,
        message : alldata
    });
};

module.exports = read;