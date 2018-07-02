const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
let db = require('knex')({
    client: 'pg',
    connection:{
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Neel@146',
        database: 'tuition_db'
    }
});

const register = require('./controllers/register');

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/register', (req, res) => { register.handleRegister(bcrypt, db)(req, res) });


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${3000}`);
});