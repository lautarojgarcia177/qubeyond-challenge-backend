require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./Routes')

const app = express()
const port = 5000

mongoose.connect(
  process.env.MONGO_CONNECTION_STRING
).catch(err => console.error(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ title: 'Express & Mongoose Backend' })
})

app.use('/api', router)

app.listen(port, () => console.log(`Express server started on port ${port}`))