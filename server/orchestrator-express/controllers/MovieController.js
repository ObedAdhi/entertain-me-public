const url = 'http://localhost:4001/movies'
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class MovieController {
  static async find (req, res, next) {
    try {
      const moviesCachedData = await redis.get('data:movies')

      if (moviesCachedData) {
        res.status(200).json(JSON.parse(moviesCachedData))
        console.log("dari cached");
      } else {
        const movies = await axios({
          method: 'GET', 
          url
        })

        await redis.set("data:movies", JSON.stringify(movies.data))
        res.status(movies.status).json(movies.data)
        console.log("dari server");
      }
    
    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    try {
      const id = req.params.id
      const movie = await axios({
        method: 'GET', 
        url: `${url}/${id}`
      })

      res.status(movie.status).json(movie.data)

    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    try {
      const moviesCachedData = await redis.get('data:movies')
      const { title, overview, poster_path, popularity, tags } = req.body
      const newMovie = await axios({
        method: 'POST', 
        url, 
        data: { title, overview, poster_path, popularity, tags }
      })

      res.status(newMovie.status).json(newMovie.data)
      if (newMovie.status === 201 && moviesCachedData) {
        await redis.del('data:movies')
      }

    } catch (error) {
      next(error)
    }
  }

  static async updateOne (req, res, next) {
    try {
      const moviesCachedData = await redis.get('data:movies')
      const id = req.params.id
      const { title, overview, poster_path, popularity, tags } = req.body
      const updatedMovie = await axios({
        method: 'PUT', 
        url: `${url}/${id}`, 
        data: { title, overview, poster_path, popularity, tags }
      })

      res.status(updatedMovie.status).json(updatedMovie.data)
      if (updatedMovie.status === 200 && moviesCachedData) {
        await redis.del('data:movies')
      }

    } catch (error) {
      next(error)
    }
  }

  static async deleteOne (req, res, next) {
    try {
      const moviesCachedData = await redis.get('data:movies')
      const id = req.params.id
      const deleteStatus = await axios({
        method: 'DELETE', 
        url: `${url}/${id}`, 
      })

      res.status(deleteStatus.status).json(deleteStatus.data)
      if (deleteStatus.status === 200 && moviesCachedData) {
        await redis.del('data:movies')
      }
      
    } catch (error) {
      next(error)
    }
  }

}

module.exports = MovieController