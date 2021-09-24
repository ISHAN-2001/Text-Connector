var express = require('express');
var router = express.Router();
let Message = require("../models/message");

// Home page route.
router.get('/', function (req, res) {

  Message.find()
    .sort({_id:-1})
    .then((records) => {

      //console.log(records);
      res.render('../views/index', {'records': records });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/error');
    });
  
})


// About page route.
router.get('/form', function (req, res) {
    res.render("../views/form");
})


router.post('/form', (req, res) => {
  // console.log(req.body);
  //let name = req.body.name;
  let message = req.body.message;

  //Saving message to db
  let m1 = new Message({
    message:message
  });

  m1.save(function (err) {
    if (err) {
      console.log(err);
      res.redirect('/error')
    }
    else {
      res.redirect("/");
    }
  });

})

router.get('/delete/:id',(req, res) => {
   
  let id = req.params.id;
  Message.findByIdAndDelete(id)
        .then(records => {
            res.redirect('/');
        })
        .catch(err => {
            res.redirect('/error');
        });
})

module.exports = router;