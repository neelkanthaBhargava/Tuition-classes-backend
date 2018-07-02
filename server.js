// imports for libraries
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
let db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Neel@146',
        database: 'tuition_db'
    }
});

// import for controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const studentList = require('./controllers/studentList');

// express app creation
const app = express();

// app.use
app.use(bodyParser.json());
app.use(cors());

// Post request for registration
app.post('/register', (req, res) => { register.handleRegister(bcrypt, db)(req, res) });

// Post Request for login requests
app.post('/signin', (req, res) => { signin.handleSignin(bcrypt, db)(req, res) });

// Student List return request
app.post('/studentList', (req, res) => { studentList.handleStudentList(db)(req, res) });


// App is listening to port ->
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${3000}`);
});