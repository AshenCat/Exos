const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const modelRoute = require('./routes/user')

const port = 7172;

const app = express()

app.use('/api/user', modelRoute)

app.listen(port, ()=>console.log(`App is listening at: http://localhost:${port}`))