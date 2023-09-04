const express = require('express')
const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization');
const cuisineController = require('../Controllers/cuisineController')
const router = express.Router()

router.use(authentication)
router.get('/', cuisineController.showCuisine)
router.post('/', cuisineController.addCuisine)
router.put('/:id', cuisineController.editCuisine)
router.get('/:id', cuisineController.detailCuisine)
router.patch('/:id', authorization, cuisineController.editStatus)
router.delete('/:id', authorization, cuisineController.deleteCuisine)

module.exports = router