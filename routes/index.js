var express = require('express');
var router = express.Router();
let multer = require('multer');
let path = require('path')
let fs = require('fs/promises');
let unlink = fs.unlink;

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: 'static/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 100000000}
}).single('file');

//----DB MODELS-----//
let Message = require("../models/message");
let FileDB = require("../models/files");

// Home page route.
router.get('/', function (req, res) {

  Message.find()
    .sort({_id:-1})
    .then((records) => {

      //console.log(records);
      res.render('index', {'records': records });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/error');
    });
  
})

router.get('/viewfiles', function (req, res) {

  FileDB.find()
    .sort({_id:-1})
    .then((records) => {
      //console.log(records);
      res.render('fileview', {'records': records });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/error');
    });
  
})


// About page route.
router.get('/form', function (req, res) {
    res.render("form");
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

router.get('/delete/:id', (req, res) => {
   
  let id = req.params.id;
  Message.findByIdAndDelete(id)
    .then(records => {
      res.redirect('/');
    })
    .catch(err => {
      res.redirect('/error');
    });
});

// Storing files in db
function storefile(originalname, currname) {
  try {
    let fileinfo = new FileDB({
      inputname: originalname,
      name: currname
    });

    fileinfo.save(function (err) {
      if (err) {
        throw "File Saving Error";
      }
    });

    } catch (error) {
      console.error(error.message);
      //res.redirect('/error');
    }
}

router.post('/upload', (req, res) => {

  upload(req, res, (err) => {
    if (err) {
      console.log("Error Occured");
      res.redirect('/');
    } else {
      if (req.file == undefined) {
        
        console.log("no file selected error")
        res.redirect('/');
      } else {
        // console.log(req.file);
        // //console.log(req.body.name);
        // console.log(`File uploaded at ${req.file.filename}`);
        // console.log(`Original filename is ${req.body.name}`);
        storefile(req.body.name , req.file.filename)
        res.redirect('/viewfiles');
      }
    }
  });
});



//----Download file------//
router.get('/download/:id', async (req, res) => {
  let id = req.params.id;
  // res.download('./uploads/demo.txt') //Change file name
  try {
    let file = await FileDB.findById(id)
    //console.log(file);
    res.download(`static/uploads/${file.name}`);
  } catch (error) {
    console.error("Error");
    res.redirect("/error");
  }

})


//---delete file------//
router.get('/deletefile/:id', async (req, res) => {
  
  let id = req.params.id;
  try {
    let file = await FileDB.findById(id)
    await unlink(`static/uploads/${file.name}`); //deleting file
    //console.log('successfully deleted file');
    const response = await FileDB.findByIdAndDelete(id); //deleting fileinfo in mongodb
    res.redirect('/viewfiles')
  } catch (error) {
    console.error('there was an error:', error.message);
    res.redirect('/error');
  }
})

module.exports = router;