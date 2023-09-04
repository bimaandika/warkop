const express = require('express')
const { authentication } = require('../middleware/authenticationCust')
const customerController = require('../Controllers/customerController')
const router = express.Router()


router.post('/register', customerController.register)
router.post('/login', customerController.login)
router.post('/login-google', customerController.loginGoogle)

router.get('/cuisine', customerController.showCuisine)
router.get('/cuisine/:id', customerController.detailMenu)
router.post('/cuisine/qr/:id', customerController.qrCode)

router.use(authentication)

router.get('/order', customerController.showOrder)
router.post('/order/:id', customerController.order)


module.exports = router