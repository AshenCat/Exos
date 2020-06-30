const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const modelRoute = require('./routes/user');
const config = require('./config/dbconf');

const port = 7172;

mongoose.connect(config.local, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    ()=>console.log(`Successfully connected to the database locally`), err => 
    console.log(`Failed to connect: ${err}`)
)
const app = express();

// Middleware section
let wstream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('common', {stream: wstream}));
app.use(helmet());

//Routes section
app.use('/api/user', modelRoute);

app.use((req,res)=> {
    if(res.statusCode === 200) res.status(404)
    const error = new Error(`Request not found - ${req.originalUrl}`);
    res.json({
        msg: "🐱‍👤" + error.message,
        stack: error.stack
    })
})

app.listen(port, () => console.log(`App is listening at: http://localhost:${port}`));