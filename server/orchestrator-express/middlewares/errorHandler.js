const errorHandler = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case "NOT_FOUND":
        return res.status(404).json({message: 'Data not found'})
    
      default:
        return res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = errorHandler