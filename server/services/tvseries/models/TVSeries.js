const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')
const tvseriesDB = getDatabase().collection('tvseries')


class Movie {
  static find() {
    return tvseriesDB.find().toArray()
  }

  static findOne(filter) {
    const id = {"_id": ObjectId(filter)}
    return tvseriesDB.findOne(id)
  }

  static create(tvseries) {
    return tvseriesDB.insertOne(tvseries)
  }

  static updateOne(filter, tvseries) {
    const id = {"_id": ObjectId(filter)}
    const newData = {$set: tvseries}
    return tvseriesDB.updateOne(id, newData)
  }

  static deleteOne(filter) {
    const id = {"_id": ObjectId(filter)}
    return tvseriesDB.deleteOne(id)
  }

  static deleteAll() {
    return tvseriesDB.deleteMany({})
  }
  
}

module.exports = Movie