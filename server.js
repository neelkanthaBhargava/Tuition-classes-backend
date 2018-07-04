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
const facultyList = require('./controllers/facultyList');
const addPayment = require('./controllers/addPayment');
const studentPaymentList = require('./controllers/studentPaymentList');
const lastPayment = require('./controllers/lastPayment');

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

// Faculty list return request
app.post('/facultyList', (req, res) => { facultyList.handleFacultyList(db)(req, res) });

// Adding a payment
app.post('/addPayment', (req, res) => { addPayment.handleNewPayment(db)(req, res) });

// Student payments list
app.post('/studentPaymentList', (req, res) => { studentPaymentList.handlePaymentList(db)(req, res) });

// Last Payment request
app.post('/lastPayment', (req, res) => { lastPayment.getLastPayment(db)(req, res) });

// App is listening to port ->
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${3000}`);
});