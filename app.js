const express           = require('express')
const expressSanitizer  = require('express-sanitizer')
const bodyParser        = require('body-parser')
const ejs               = require('ejs')

// Route links
const configRoutes  = require('./routes/configRoutes')
const rootRoutes    = require('./routes/rootRoutes')

// Express
const app = express()

// App Config
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSanitizer())
app.use('/', express.static(__dirname))
app.set('view engine', 'ejs')

// Use Routes
app.use('/config', configRoutes)
app.use(rootRoutes)

// server is listening.....
app.listen(process.env.PORT || 3000, function () {
  const port = this.address().port
  console.log('SEB-CG is listening on port ' + port + '!')
})
