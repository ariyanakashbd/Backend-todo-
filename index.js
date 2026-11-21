require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mongodbConnect = require('./config/mongodb');
mongodbConnect();
const registrationController = require('./controllers/registrationController');
const loginController =require('./controllers/loginController');
const newCreate = require('./controllers/createTodo');
const read = require('./controllers/readTodo');
const gard =require('./midllerware/security');
const todoDelete =require('./controllers/todoDelete');
const todoUpdate = require('./controllers/todoUpdate');

app.post('/registration', registrationController);
app.post('/login',loginController);
app.post('/todo-create',newCreate);
app.get('/data-read',gard,read);
app.delete('/delete/:id',todoDelete);
app.post('/update/:id',todoUpdate)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});