const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const expressSession = require('express-session')
const fileUpload = require('express-fileupload')
var device = require('express-device')
require('dotenv').config()

const app = express();

mongoose.connect(process.env['CONNECTION_STRING'], {useNewUrlParser: true,useUnifiedTopology: true})

app.use(fileUpload())

app.use(device.capture())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({secret: process.env['KEY'],resave: false,saveUninitialized: true}))

app.use(express.static('public'))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const main = require('./routes/main')
app.use('/', main)

const server = app.listen(3000, function () {})