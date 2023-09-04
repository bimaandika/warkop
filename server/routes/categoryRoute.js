const express = require('express')
const { authentication } = require('../middleware/authentication')
const categoryController = require('../Controllers/categoryController')
const router = express.Router()

router.use(authentication)
router.get('/', categoryController.showCategory)
router.post('/', categoryController.addCategory)
router.delete('/:id', categoryController.deleteCategory)
router.patch('/:id', categoryController.editCategory)

module.exports = router