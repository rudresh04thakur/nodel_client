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

//router.get(function(req,res,next))
router.all('*',function(req,res,next){
  if(req.session.isLogin==true){
    next();
  }else{
    res.redirect('/users/login')
  }
})

router.get('/',function(req,res,next){
  res.render('admin/index',{'data':req.session.user.email});
})

module.exports = router;