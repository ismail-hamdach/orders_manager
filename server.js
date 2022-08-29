require('dotenv').config()

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Init express
const app = express();

// Init Port Number
const PORT = process.env.PORT || 5000

// Body parser
app.use(express.json())
app.use(express.urlencoded())

// Init CORS 
// @Desc 
// It's used to allow access from a different origin 
app.use(cors({
  origin: '*'
}));

// Morgan use 
morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  })
app.use(morgan('combined'))

// Authentication Route
app.use('/', require('./service/authentication'))

// User Route
app.use('/api/user', require('./service/user'))

// Lunch Server
app.listen(PORT, () => {
    console.log('Server Running on Port ' + PORT);
})