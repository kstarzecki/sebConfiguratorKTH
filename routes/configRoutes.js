const express   = require('express')
const sebCg     = require('../configGen.js')
const convert   = require('xml-js')
      
const router    = express.Router({mergeParams: true});

//index route
router.get('/', function(req, res){
  res.render('index');
});

router.post('/',function (req, res) {
  if (Object.keys(req.query).length === 0) {
    var courseID = req.sanitize(req.body.courseID);
  } else {
    var courseID = req.query.courseID
    // .split(",")
    // console.log('arr'+Array.isArray(courseID))
  }
  var patt = /^[0-9]*$/
  if (patt.test(courseID)) {
    console.info(`Generating SEB Config for CourseID: ${courseID}.`);
    var config = sebCg.generateSEBConfig(courseID)
    var filename = `SebClientSettings-${courseID}.seb`
    const writeOptions = { compact: false, ignoreComment: false, spaces: 2, fullTagEmptyElement: true }
    const file = convert.js2xml(config, writeOptions)

    res.set({'Content-Disposition': 'attachment; filename='+filename,'Content-type': 'text/seb'});
    res.send(file);
  } else {
    res.status(400).send('Bad Request')
  } 
});

module.exports = router