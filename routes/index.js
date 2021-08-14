var express = require('express');
var router = express.Router();
let Message = require("../models/message");

// Home page route.
router.get('/', function (req, res) {

  Message.find((err, records) => {
    if (err) {
      // console.log(err)
      res.render('../views/index', { layout: false });
  }
  else {
      // console.log(records);
      res.render('../views/index', { layout: false, 'records':records });
  }
  }).lean();
})

// About page route.
router.get('/form', function (req, res) {
    res.render("../views/form", {layout:false});
})


router.post('/form', (req, res) => {
  // console.log(req.body);
  let name = req.body.name;
  let message = req.body.message;

  //Saving message to db
  let m1 = new Message({
    name: name,
    message:message
  });

  m1.save(function (err) {
    if (err) {
      console.log(err);
      res.send("Error cannot save");
    }
    else {
      res.redirect("/");
    }
  });

})

module.exports = router;