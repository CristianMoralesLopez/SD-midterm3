const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
// Database: Mongo
const mongoose = require('mongoose')
// Try to change PASSWORD to process.env.MONGO_ATLAS_PW (EN: variable de entorno)
mongoose.connect('mongodb+srv://PASSWORD@clusterparcial2-vrxdh.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
  console.log('connection to database establish')
}).catch(err => {
  console.log(err)
  process.exit(-1)
})

const movieRoutes = require('../routes/movies')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes which should handle request
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
  next()
})
app.use('/movies', movieRoutes)

module.exports = app