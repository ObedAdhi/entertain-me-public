const TVSeries = require('../models/TVSeries')

class TVSeriesController {
  static async find (req, res, next) {
    try {
      const tvseries = await TVSeries.find()

      res.status(200).json(tvseries)

    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    try {
      const id = req.params.id
      const tvseries = await TVSeries.findOne(id)

      if (!tvseries) {
        next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json(tvseries)
      }

    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body
      const newTVSeries = await TVSeries.create({ title, overview, poster_path, popularity, tags })

      res.status(201).json(newTVSeries.ops[0])

    } catch (error) {
      next(error)
    }
  }

  static async updateOne (req, res, next) {
    try {
      const id = req.params.id
      const { title, overview, poster_path, popularity, tags } = req.body
      const updatedTVSeries = await TVSeries.updateOne(id, { title, overview, poster_path, popularity, tags })

      if (updatedTVSeries.result.n === 0) {
        next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json({message: 'TVSeries data updated'})
      }

    } catch (error) {
      next(error)
    }
  }

  static async deleteOne (req, res, next) {
    try {
      const id = req.params.id
      const deleteStatus = await TVSeries.deleteOne(id)

      if (deleteStatus.result.n === 0) {
        next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json({message: "TVSeries data deleted"})
      }

    } catch (error) {
      next(error)
    }
  }

  static async deleteAll (req, res, next) {
    try {
      const deleteStatus = await TVSeries.deleteAll()
      res.status(200).json({message: 'All data deleted'})
    } catch (error) {
      next(error)
    }
  }

}

module.exports = TVSeriesController