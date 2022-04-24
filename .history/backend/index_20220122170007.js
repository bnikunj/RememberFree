
const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const app = express()
const port = 3000

app.get('/login', (req, res) => {
  res.send('Hello Nikunj Bhuva!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
