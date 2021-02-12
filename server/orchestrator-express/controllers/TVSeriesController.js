const url = 'http://localhost:4002/tvseries'
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class TVSeriesController {
  static async find (req, res, next) {
    try {
      const tvseriesCachedData = await redis.get('data:tvseries')

      if (tvseriesCachedData) {
        res.status(200).json(JSON.parse(tvseriesCachedData))
        console.log("dari cached");
      } else {
        const tvseries = await axios({
          method: 'GET', 
          url
        })

        await redis.set("data:tvseries", JSON.stringify(tvseries.data))
        res.status(tvseries.status).json(tvseries.data)
        console.log("dari server");
      }

    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    try {
      const id = req.params.id
      const tvseries = await await axios({
        method: 'GET', 
        url: `${url}/${id}`
      })

      res.status(tvseries.status).json(tvseries.data)

    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    try {
      const tvseriesCachedData = await redis.get('data:tvseries')
      const { title, overview, poster_path, popularity, tags } = req.body
      const newTVSeries = await axios({
        method: 'POST', 
        url, 
        data: { title, overview, poster_path, popularity, tags }
      })

      res.status(newTVSeries.status).json(newTVSeries.data)
      if (newTVSeries.status === 201 && tvseriesCachedData) {
        await redis.del('data:tvseries')
      }

    } catch (error) {
      next(error)
    }
  }

  static async updateOne (req, res, next) {
    try {
      const tvseriesCachedData = await redis.get('data:tvseries')
      const id = req.params.id
      const { title, overview, poster_path, popularity, tags } = req.body
      const updatedTVSeries = await axios({
        method: 'PUT', 
        url: `${url}/${id}`, 
        data: { title, overview, poster_path, popularity, tags }
      })

      res.status(updatedTVSeries.status).json(updatedTVSeries.data)
      if (updatedTVSeries.status === 200 && tvseriesCachedData) {
        await redis.del('data:tvseries')
      }

    } catch (error) {
      next(error)
    }
  }

  static async deleteOne (req, res, next) {
    try {
      const tvseriesCachedData = await redis.get('data:tvseries')
      const id = req.params.id
      const deleteStatus = await axios({
        method: 'DELETE', 
        url: `${url}/${id}`, 
      })

      res.status(deleteStatus.status).json(deleteStatus.data)
      if (deleteStatus.status === 200 && tvseriesCachedData) {
        await redis.del('data:tvseries')
      }

    } catch (error) {
      next(error)
    }
  }

}

module.exports = TVSeriesController