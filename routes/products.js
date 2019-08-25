var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer  = require('multer')
var path = require('path')
var storageGB = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
})
//var upload = multer({ dest: 'public/uploads' })
var upload = multer({ storage: storageGB })

mongoose.connect('mongodb://localhost/node_client', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connection Done")
});

const Products = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  weight: String,
  type: String,
});

router.get('/',function(req,res,next){
    var productModel = mongoose.model('products', Products);
    productModel.find(function(err,data) {
      if (err) {
        console.log("Error ", err);
      } else {
        res.render('admin/products/index',{'data':data});
      }
    })
})

router.get('/add',function(req,res,next){
    res.render('admin/products/add');
})

router.post('/add',upload.single('image'),function(req,res,next){
  var productModel = mongoose.model('products', Products);
  var product = new productModel(req.body);
  product['image']="/uploads/"+req.file.filename
  product.save(function (err) {
    if (err) {
      res.send("Error ", err);
    } else {
      console.log("Data",req.body)
      res.redirect("/admin/products");
    }
  })
})

module.exports = router;