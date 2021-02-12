const Movie = require('../models/Movie')

class MovieController {
  static async find (req, res) {
    try {
      const movies = await Movie.find()
      res.json(movies)
    } catch (error) {
      console.log(error);
    }
  }

  static async create (req, res) {
    try {
      const newMovie = await Movie.create(req.body)
      res.json(newMovie)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MovieController