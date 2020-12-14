require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware')

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
app.get('/auth/logout', authCtrl.logout)
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)


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









