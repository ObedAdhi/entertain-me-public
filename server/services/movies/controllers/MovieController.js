const Movie = require('../models/Movie')

class MovieController {
  static async find (req, res, next) {
    try {
      const movies = await Movie.find()

      res.status(200).json(movies)

    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    try {
      const id = req.params.id
      const movie = await Movie.findOne(id)

      if (!movie) {
        next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json(movie)
      }

    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body
      const newMovie = await Movie.create({ title, overview, poster_path, popularity, tags })

      res.status(201).json(newMovie.ops[0])

    } catch (error) {
      next(error)
    }
  }

  static async updateOne (req, res, next) {
    try {
      const id = req.params.id
      const { title, overview, poster_path, popularity, tags } = req.body
      const updatedMovie = await Movie.updateOne(id, { title, overview, poster_path, popularity, tags })

      if (updatedMovie.result.n === 0) {
        next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json({message: 'Movie data updated', status: updatedMovie.result})
      }

    } catch (error) {
      next(error)
    }
  }

  static async deleteOne (req, res, next) {
    try {
      const id = req.params.id
      const deleteStatus = await Movie.deleteOne(id)

      if (deleteStatus.result.n === 0) {
        next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json({message: "Movie data deleted", status: deleteStatus.result})
      }

    } catch (error) {
      next(error)
    }
  }

  static async deleteAll (req, res, next) {
    try {
      const deleteStatus = await Movie.deleteAll()
      res.status(200).json({message: 'All data deleted'})
    } catch (error) {
      next(error)
    }
  }

}

module.exports = MovieController