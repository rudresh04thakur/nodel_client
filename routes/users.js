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

router.get('/view/:id',function(req,res,next){
  var userModel = mongoose.model('user', Users);
  userModel.findOne({'_id':req.params.id},function(err,data) {
    if (err) {
      console.log("Error ", err);
    } else {
      console.log(data)
      res.render('users/view',{'data':data});
    }
  })
})

router.delete('/delete/:id',function(req,res,next){
  var userModel = mongoose.model('user', Users);
  if(req.params.id == 'all'){
    userModel.remove(function(err) {
      if (err) {
        console.log("Error ", err);
      } else {
        res.redirect('/users/list');
      }
    })
  }else if(req.params.id == 'check'){
    userModel.remove({'_id':{ $in: req.body.checkbox}},function(err) {
      if (err) {
        console.log("Error ", err);
      } else {
        res.redirect('/users/list');
      }
    })
  }else{
    userModel.remove({'_id':req.params.id},function(err) {
      if (err) {
        console.log("Error ", err);
      } else {
        res.redirect('/users/list');
      }
    })
  }  
})

router.get('/edit/:id',function(req,res,next){
  var userModel = mongoose.model('user', Users);
  userModel.findOne({'_id':req.params.id},function(err,data) {
    if (err) {
      console.log("Error ", err);
    } else {
      console.log(data)
      res.render('users/register',{'data':data});
    }
  })
})


router.post('/update/:id', function (req, res, next) {
  var userModel = mongoose.model('user', Users);
  var user = new userModel(req.body);
  //console.log(req.body)
  user.updateOne({'_id':req.params.id},req.body,function (err,data) {
    if (err) {
      res.send("Error ", err);
    } else {
      console.log(data)
      res.redirect('/users/list')
    }
  })
});



// router.post('/delete/:id',function(req,res,next){
//   var userModel = mongoose.model('user', Users);
//   userModel.remove({'_id':req.params.id},function(err) {
//     if (err) {
//       console.log("Error ", err);
//     } else {
//       res.redirect('/users/list');
//     }
//   })
// })




module.exports = router;