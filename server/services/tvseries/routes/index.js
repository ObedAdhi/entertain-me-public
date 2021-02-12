const router = require('express').Router()
const TVSeriesController = require('../controllers/TVSeriesController')

router.get('/tvseries', TVSeriesController.find)
router.get('/tvseries/:id', TVSeriesController.findOne)
router.post('/tvseries', TVSeriesController.create)
router.put('/tvseries/:id', TVSeriesController.updateOne)
router.delete('/tvseries/:id', TVSeriesController.deleteOne)
router.delete('/warningAlltvseries', TVSeriesController.deleteAll)


module.exports = router