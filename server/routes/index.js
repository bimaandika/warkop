const express = require('express')
const userController = require('../Controllers/userController')
const categoryRouter = require('./categoryRoute')
const cuisineRouter = require('./cuisineRoute')
const historyRouter = require('./historyRoute')
const customerRouter = require('./customerRoute')
const router = express.Router()


router.post('/register', userController.adminRegister)
router.post('/login', userController.login)
router.post('/google-signin', userController.loginGoogle)

router.use('/public', customerRouter)
router.use('/cuisines', cuisineRouter)
router.use('/categories', categoryRouter)
router.use('/histories', historyRouter)

module.exports = router