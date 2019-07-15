const express = require('express')
const mongoose = require('mongoose')

// create aplication
const app = express()

// connect to database
mongoose.connect(
  process.env.DB_CONNECT,
  { 
    useNewUrlParser: true,
    useCreateIndex: true
  },
  () => console.log('connected to DB') 
)

// Middleware
app.use(express.json())

// import Routes
const authRoute = require('./routes/auth.js')

// Route Middleware
app.use('/api/user', authRoute)

module.exports = app
