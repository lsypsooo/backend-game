const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/img/game', express.static(path.join(__dirname, 'upload')))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/users', require('./routes/user'))
app.use('/tags', require('./routes/tags'))
app.use('/game', require('./routes/game'))
app.use('/transaction', require('./routes/transaction'))

app.listen(3000, () => {
  console.log('server has been started')
})