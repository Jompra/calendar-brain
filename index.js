const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const { dbURI, port, dbSettings } = require('./config/environment')

const router = require('./config/routes')

mongoose.connect(dbURI, dbSettings, (err) => {
  if (err) return console.log(err)
  console.log('Mongo is Connected!')
})

app.use('/api', bodyParser.json())

app.use('/api', router)

app.listen(port, () => console.log(`Up and running on port ${port}`))