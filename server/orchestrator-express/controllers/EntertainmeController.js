const axios = require("axios")

class EntertainmeController {
  
  static getAllData (req, res, next) {
    Promise.all([
      axios(`http://localhost:4001/movies`),
      axios(`http://localhost:4002/tvseries`)
    ])
      .then(responses => {
        res.status(200).json({
          movies: responses[0].data,
          tvSeries: responses[1].data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

}

module.exports = EntertainmeController