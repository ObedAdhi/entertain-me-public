const { getDatabase } = require('../config/mongodb')

class Movie {
  static find() {
    return getDatabase().collection('movies').find().toArray()
  }

  static create(movie) {
    return getDatabase().collection('movies').insertOne(movie)
  }
}

module.exports = Movie