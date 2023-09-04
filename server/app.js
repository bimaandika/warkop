require('dotenv').config()
var cors = require('cors')
const express = require('express')
const { errorHandler } = require('./middleware/errorhandler');
const router = require('./routes');
const app = express()
// const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)
router.use(errorHandler)

module.exports = app
