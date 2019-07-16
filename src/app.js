const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

/* create aplication */
const app = express()

/* connect to database */
mongoose.connect(
  process.env.DB_CONNECT,
  { 
    useNewUrlParser: true,
    useCreateIndex: true
  },
  () => console.log('connected to DB') 
)

/* Middleware */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())

/* configs */
require('./configs/passport/') (passport)

/* import Routes */
const authRoute = require('./routes/auth')

/* Route Middleware */
app.use('/api/user', authRoute)

module.exports = app
