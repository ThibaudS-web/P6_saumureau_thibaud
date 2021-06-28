const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

//Imports of sauce and user routes 
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

//Connection to mangoDB
mongoose.connect('mongodb+srv://ThibS:14y3X3DDA3FPSrFA@cluster0.ffla6.mongodb.net/OPC-project_6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Use Express with const app
const app = express()

//Setup headers
app.use((req, res, next) =>   {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

//Use body-parser for parsing bodies request
app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

module.exports = app
