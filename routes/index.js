var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.render('../views/index', { layout: false });
})

// About page route.
router.get('/form', function (req, res) {
    res.render("../views/form", {layout:false});
})

router.post('/form', (req, res) => {
  // console.log(req.body);
  let name = req.body.name;
  let message = req.body.message;
  res.send(`The name is ${name} and message is ${message}`)
})

module.exports = router;