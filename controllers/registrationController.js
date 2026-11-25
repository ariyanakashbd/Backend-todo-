const User = require('../models/registartionModel');
const nodemailer = require("nodemailer");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: 'ariyanakash01303@gmail.com',
    pass: 'ogle iffv guns qchz',
  },
});

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

    try {
  const info = await transporter.sendMail({
    from: '"Example Team" <ariyanakash01303@gmail.com>', 
    to: email, 
    subject: "Hello", 
    html: `<body style="margin:0;padding:20px;background:#f1f5f9;font-family:Arial,sans-serif"><div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden"><div style="background:#2563eb;padding:30px;text-align:center;color:#fff"><h1 style="margin:0">Job Proposal</h1><p style="margin:10px 0 0">A Professional Opportunity</p></div><div style="padding:30px"><h2 style="color:#111827">Hello ${name},</h2><p style="color:#4b5563;line-height:1.7">We are excited to share a new job opportunity with you. Based on your skills and experience, we believe you could be a great fit for our team.</p><div style="background:#eff6ff;padding:20px;border-radius:8px;margin:25px 0"><h3 style="color:#1e40af;margin-top:0">Job Details</h3><p><strong>Position:</strong>{{jobTitle}}</p><p><strong>Company:</strong>{{companyName}}</p><p><strong>Salary:</strong>{{salary}}</p><p><strong>Location:</strong>{{location}}</p></div><p style="color:#4b5563;line-height:1.7">If you are interested in this opportunity, please click the button below to review the proposal.</p><div style="text-align:center;margin:30px 0"><a href="{{proposalLink}}" style="background:#2563eb;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:700">View Job Proposal</a></div><p style="color:#4b5563">Best Regards,</p><h3 style="color:#111827;margin-bottom:5px">{{senderName}}</h3><p style="color:#64748b;margin-top:0">{{companyName}}</p></div><div style="background:#f8fafc;padding:20px;text-align:center"><p style="font-size:12px;color:#94a3b8">This is an automated email. Please do not reply directly.</p></div></div></body>`, 
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
};

let dataCreate = new User({
     name : name,
     email : email,
     password : hashPassword,
     gender : gender,
     terms : terms
});

await dataCreate.save();
return res.json({
    success : true,
    message : 'Registration Successfull '
});

};

module.exports = registrationController;