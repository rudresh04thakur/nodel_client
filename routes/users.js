var express = require('express');
var router = express.Router();


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
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/node_client";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var collection = db.collection('users')
    collection.insert(req.body, function (error, data) {
      console.log("Data ", data);
      console.log("Error ", error)
    })
  })
  res.send(req.body);
});

module.exports = router;