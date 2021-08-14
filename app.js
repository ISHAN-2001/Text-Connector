var express = require("express");
var expressHbs = require("express-handlebars");
const path = require('path')
const mongoose = require("mongoose")
var app = express();

app.use('/static', express.static('static'))
app.set('views', path.join(__dirname, 'views'))


// Set up MongoDB
mongoose.connect('mongodb://localhost:27017/test1', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log("DB Connected !");
});

app.engine(".hbs", expressHbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

var hbs = expressHbs.create({});
hbs.handlebars.registerHelper("reduce", function(s) {
  return s.substring(0,50)+"..."
});




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var home = require('./routes/index.js');
app.use('', home);

app.listen(3000, () => {
  console.log(`Listening on http://127.0.0.1:3000`);
});
