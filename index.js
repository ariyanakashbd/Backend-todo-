require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mongodbConnect = require('./config/mongodb');
mongodbConnect();
const {registrationController,otpVerification} = require('./controllers/registrationController');
const loginController =require('./controllers/loginController');
const newCreate = require('./controllers/createTodo');
const read = require('./controllers/readTodo');
const gard =require('./midllerware/security');
const todoDelete =require('./controllers/todoDelete');
const todoUpdate = require('./controllers/todoUpdate');
const multer  = require('multer');
const path = require('path');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
   cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage });


app.post('/registration', registrationController);
app.post('/login',loginController);
app.post('/todo-create',newCreate);
app.get('/data-read',gard,read);
app.delete('/delete/:id',todoDelete);
app.post('/update/:id',todoUpdate);
app.post('/otp-verify',otpVerification)



app.post('/uplead',upload.single("image") ,(req,res) =>{
    try{
      if(!req.file){
        return res.status(400).json({
            success : false,
            message : 'please uplead and image'
        });
      };

      res.status(200).json({
        success : true,
        message : 'image upload successfully',
      });

    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});