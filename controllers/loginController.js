const User = require('../models/registartionModel');
 async function loginController (req,res){

    let {email,password} = req.body;

    if(!email && !password){

        return res.json({
            success : false,
            message : 'Please enter your email and password'
        });
    };

    if(!email){
        return res.json({
            success : false,
            message : 'Please inter your vaild email and password'
        });
    };
    if(!password){
        return res.json({
            success : false,
            message : 'Please inter your vaild email and password'
        });
    };

    let userExist = await User.findOne({email : email});
    if(!userExist){
        return res.json({
            success : false,
            message : 'Invalid email or password'
        });
    };
    if(userExist.password !== password){
        return res.json({
            success : false,
            message : 'Incorrect password and email'
        });
    };
    return res.json({
        success :true,
        message : 'Login successfull'
    });
 };
 module.exports = loginController;