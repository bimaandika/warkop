const express = require('express')
const { authentication } = require('../middleware/authentication')
const historyController = require('../Controllers/historyController')
const router = express.Router()

router.use(authentication)
router.get('/', historyController.showHistory)


module.exports = router