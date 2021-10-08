var express = require("express");
var expressHbs = require("express-handlebars");
const path = require('path')
const mongoose = require("mongoose")
var app = express();

app.use('/static', express.static('static'))


// Set up MongoDB
let url  = require('./models/db')

app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var home = require('./routes/index.js');
app.use('', home);


//-----404 error page------//
app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404');
    return;
  }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
