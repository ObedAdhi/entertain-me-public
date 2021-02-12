const router = require('express').Router()
const movieRouter = require('./movieRouter')
const tvSeriesRouter = require('./tvSeriesRouter')
const EntertainmeController = require('../controllers/EntertainmeController')

router.use('/movies', movieRouter)
router.use('/tvseries', tvSeriesRouter)
router.get('/entertainme', EntertainmeController.getAllData)

module.exports = router