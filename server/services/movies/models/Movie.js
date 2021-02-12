const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')
const movieDB = getDatabase().collection('movies')


class Movie {
  static find() {
    return movieDB.find().toArray()
  }

  static findOne(filter) {
    const id = {"_id": ObjectId(filter)}
    return movieDB.findOne(id)
  }

  static create(movie) {
    return movieDB.insertOne(movie)
  }

  static updateOne(filter, movie) {
    const id = {"_id": ObjectId(filter)}
    const newData = {$set: movie}
    return movieDB.updateOne(id, newData)
  }

  static deleteOne(filter) {
    const id = {"_id": ObjectId(filter)}
    return movieDB.deleteOne(id)
  }

  static deleteAll() {
    return movieDB.deleteMany({})
  }
  
}

module.exports = Movie