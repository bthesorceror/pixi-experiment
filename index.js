const express = require('express')

let app = express()
let port = process.env.PORT || 5000

app.use('/public', express.static('public'))

app.set('views', 'views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.info(`Now listening on port ${port}`)
})
