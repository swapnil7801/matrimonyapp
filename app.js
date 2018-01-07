var express = require('express');
let contextPath = process.cwd(); // This is the context path of the application.
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require(contextPath+'/routes/users');
let app_config = require(contextPath + '/config/app_config.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/index', routes);
// app.use('/users', users);
 
app.use(bodyParser.text({
    type: 'text/xml'
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


 app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
   res.send('matrimony Microservice Up and running');
  
});
app.use('/api/user', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('URL Not Found');
  err.status = 404;
  next(err);
});

    
Object.assign=require('object-assign')

// app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}
var db = null,
    dbDetails = new Object();

// var initDb = function(callback) {
//   if (mongoURL == null) return;

//   var mongodb = require('mongodb');
//   if (mongodb == null) return;

//   mongodb.connect(mongoURL, function(err, conn) {
//     if (err) {
//       callback(err);
//       return;
//     }

//     db = conn;
//     dbDetails.databaseName = db.databaseName;
//     dbDetails.url = mongoURLLabel;
//     dbDetails.type = 'MongoDB';

//     console.log('Connected to MongoDB at: %s', mongoURL);
//   });
// };

var datasource= function() {
            // console.log('Using mongoose datasource - ' + config.db_url);
            if (app_config.app_env == "local") {
              mongoURL=app_config.db_url;
            }  
            console.log("url-->",mongoURL);
            // mongoose.connect(mongoURL);
            mongoose.connect(mongoURL, {
              useMongoClient: true
            });
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error...'));
            db.once('open', function callback() {
                console.log('matrimony  db opened');
            });
        }



// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

datasource();
 
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
