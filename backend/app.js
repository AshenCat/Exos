const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const userRoute = require('./routes/user');
const characterRoute = require('./routes/character');
const config = require('./config/conf');

const port = 7172;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    ()=>console.log(`Successfully connected to the database locally`), err => 
    console.log(`Failed to connect: ${err}`)
)

const app = express();

// Middleware section
let wstream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin: config.origin,
    credentials: true
}));
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser(config.secret))
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig')(passport);
app.use(morgan('common', {stream: wstream}));
app.use(helmet());



//Routes section
app.use('/api/user', userRoute);
app.use('/api/character', characterRoute);

app.use((req,res)=> {
    if(res.statusCode === 200) res.status(404)
    const error = new Error(`Request not found - ${req.originalUrl}`);
    res.json({
        msg: "🐱‍👤" + error.message,
        stack: error.stack
    })
})

app.listen(port, () => console.log(`App is listening at: http://localhost:${port}`));