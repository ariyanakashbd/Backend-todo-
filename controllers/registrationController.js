const User = require('../models/registartionModel');
const nodemailer = require("nodemailer");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator')

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.APP_PASSWORD
  },
});
// Registration controller

async function registrationController(req,res) {

    let {name,email,password,confirmPassword, gender,terms} = req.body;

    if(!name && !email && !password && !gender && !terms){
        return res.json({
            success : false,
            message : 'Fill the all filed'
        });
    };

    let errors = {};

    if(!name){
        errors.name = 'Please enter your name'
    };
    
    if(!email){
        errors.email = 'Please enter your email'
    };
    
    if(!password){
        errors.password = 'Please enter your passwqord'
    }else if(password !== confirmPassword){
        errors.confirmPassword = 'Do not match confirm Password'
    }
    
    if(!gender){
        errors.gender = 'Please enter your gender'
    };
    
    if(terms !== true){
          errors.terms = 'Please accept terms and conditions';
    };
    if(Object.keys(errors).length > 0){
        return res.json({
            success : false,
            message : errors
        });
    };

    if(!emailRegex.test(email)){

        return res.json({
            success : false,
            message : 'Please enter your valid email' 
        });
    };

    let exstingUser = await User.findOne({email : email});
    if(exstingUser){
        return res.json({
            success : false,
            message : 'User already exsting'
        });
    };

   //hash password 

   const hashPassword = await bcrypt.hash(password,10);

   //OTP genaretor

   let otp = otpGenerator.generate(6, 
        {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            digits: true,
        });

 // data save

let dataCreate = new User({
     name : name,
     email : email,
     password : hashPassword,
     gender : gender,
     terms : terms,
     otp : otp
});

//nodemailer email send

try {
  const info = await transporter.sendMail({
    from: '"Example Team" <ariyanakash01303@gmail.com>', 
    to: email, 
    subject:name, 
    html: `<a href ="http://localhost:5000/otp-verify"></<h3 style="text-align:center">Your Verification Code</h3><div style="background:#eff6ff;padding:20px;text-align:center;border-radius:8px"><h1 style="color:#2563eb;letter-spacing:8px">${otp}</h1></div><p style="text-align:center">Enter this code on the verification page.</p><div style="text-align:center;margin:25px 0"><a href="http://localhost:5173/otp-verify" style="background:#2563eb;color:#fff;padding:14px 30px;text-decoration:none;border-radius:6px;display:inline-block">Click Here</a></div>`, 
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log(err);
    return res.status(500).json({
        success: false,
        message: 'Email sending failed'
    });
}


await dataCreate.save();
return res.json({
    success : true,
    message : 'Registration Successfull '
});

};

// otp controller

let otpVerification = async (req,res) =>{
   let {email,otp} = req.body;
   let data = await User.findOne({otp : otp,email : email,isVerified : false});

   if(data){

   await User.findOneAndUpdate({otp : otp}, {isVerified : true, otp : ''});

  return res.status(200).json({
    success : true,
    message : 'User Verified '
   });

   }else{
    res.status(400).json({
        success : false,
        message : 'otp invalid'
    });

   };
}
module.exports = {registrationController,otpVerification};