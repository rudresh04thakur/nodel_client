var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var expressSanitizer = require('express-sanitizer');
var session = require('express-session')
var bodyParser = require('body-parser')


//var upload = multer({ dest: '/public/uploads/' })

////MongoDb Connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_client', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connection Done")
});

//Routing

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var productsRouter = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(cookieParser());
//app.use('/admin', express.static('./node_modules/admin-lte-express/public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }
app.use(session({
  secret: 'rudresh04thakur@gmail.com',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge: 1200000 },
  isLogin:false
}))


app.use(function(req,res,next){
  req.db = db;
  next();
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);   
app.use('/admin/products',productsRouter);
//app.use('/admin', require('admin-lte-express'));

//
/*
  --save  //Save in current dependancies
  --save-dev //Save in current dev dependncies
  -g //Install in global location

*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
