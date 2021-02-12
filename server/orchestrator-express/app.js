if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const router = require('./routes')
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log('App running on port: ', port);
})
