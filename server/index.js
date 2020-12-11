require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');

const app = express();

const PORT = 4000;

app.use(express.json());

const { CONNECTION_STRING, SESSION_SECRET } = process.env;


app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
}));


app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
}).then((dbInstance) => {
    app.set('db', dbInstance);
    console.log('.then in dbInstance index.js running...meaning the db is connected');
    app.listen(PORT, () =>
        console.log(`Server ready on port ${PORT}`));
})









