const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/', function (req, res) {
  res.redirect('/config')
})

router.get('/about', function (req, res) {
  res.render('about')
})

// universal404
router.get('/404', function (req, res) {
  res.render('fourOhFour')
})

// catchall for 404
router.get('*', function (req, res) {
  console.log('404ing, reason:')
  console.log(req.params)
  res.redirect('/404')
})

module.exports = router
