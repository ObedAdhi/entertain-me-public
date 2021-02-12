const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.find)
router.get('/:id', MovieController.findOne)
router.post('/', MovieController.create)
router.put('/:id', MovieController.updateOne)
router.delete('/:id', MovieController.deleteOne)


module.exports = router