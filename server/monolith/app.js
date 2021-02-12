if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')
const { connect } = require('./config/mongodb')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

connect().then(async (db) => {
  app.listen(port, () => {
    console.log('App running on port: ', port);
  })
})
