const router = require('express').Router()
const TVSeriesController = require('../controllers/TVSeriesController')

router.get('/', TVSeriesController.find)
router.get('/:id', TVSeriesController.findOne)
router.post('/', TVSeriesController.create)
router.put('/:id', TVSeriesController.updateOne)
router.delete('/:id', TVSeriesController.deleteOne)


module.exports = router