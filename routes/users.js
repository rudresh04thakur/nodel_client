var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_client', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connection Done")
});


const Users = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: String
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
  res.render('users/register', {
    title: 'Register'
  });
});

router.post('/register', function (req, res, next) {
  var userModel = mongoose.model('user', Users);
  var user = new userModel(req.body);
  user.save(function (err) {
    if (err) {
      res.send("Error ", err);
    } else {
      res.send("Data Saved");
    }
  })
});


router.get('/list', function (req, res, next) {
  var userModel = mongoose.model('user', Users);
  userModel.find(function(err,data) {
    if (err) {
      console.log("Error ", err);
    } else {
      res.render('users/list',{'data':data});
    }
  })
});

module.exports = router;