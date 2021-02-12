const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.find)
router.post('/', MovieController.create)


module.exports = router