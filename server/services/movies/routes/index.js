const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/movies', MovieController.find)
router.get('/movies/:id', MovieController.findOne)
router.post('/movies', MovieController.create)
router.put('/movies/:id', MovieController.updateOne)
router.delete('/movies/:id', MovieController.deleteOne)
router.delete('/warningAllmovies', MovieController.deleteAll)


module.exports = router