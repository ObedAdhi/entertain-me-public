const router = require('express').Router()
const MovieRouter = require('./Movie')
// const TVSeriesRouter = require('./TVSeries')

router.use('/movies', MovieRouter)
// router.use('/tv', TVSeriesRouter)

module.exports = router