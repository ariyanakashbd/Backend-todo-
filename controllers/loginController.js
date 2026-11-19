const User = require('../models/registartionModel');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: 'ariyanakash01303@gmail.com',
    pass: 'ogle iffv guns qchz',
  },
  });
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

        try {
      const info = await transporter.sendMail({
        from: '"Example Team" <ariyanakash01303@gmail.com>', 
        to: email, 
        subject: "Hello", 
        html: `<body style="margin:0;padding:20px;background:#f1f5f9;font-family:Arial,sans-serif"><div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden"><div style="background:#2563eb;padding:30px;text-align:center;color:#fff"><h1 style="margin:0">Login Successful!</h1><p>Account Security Notification</p></div><div style="padding:30px"><h2 style="color:#111827">Hello {{name}},</h2><p style="color:#4b5563;line-height:1.7">Your account has been successfully logged in. We are happy to see you again!</p><div style="background:#eff6ff;padding:20px;border-radius:8px;margin:25px 0"><h3 style="color:#1e40af">Login Details</h3><p><strong>Email:</strong>{{email}}</p><p><strong>Date:</strong>{{date}}</p><p><strong>Time:</strong>{{time}}</p></div><p style="color:#4b5563;line-height:1.7">If this wasn't you, please secure your account immediately by changing your password.</p><p style="color:#4b5563">Best Regards,</p><h3 style="color:#2563eb">Your Team</h3></div><div style="background:#f8fafc;padding:20px;text-align:center"><p style="font-size:12px;color:#94a3b8">This is an automated security notification.</p></div></div></body>`, 
      });
    
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
      console.error("Error while sending mail:", err);
    };

    return res.json({
        success :true,
        message : 'Login successfull'
    });
 };
 module.exports = loginController;