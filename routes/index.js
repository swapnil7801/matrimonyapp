'use strict'
var express = require('express');
var router = express.Router();
let contextPath = process.cwd(); // This is the context path of the application.

let Base=require(contextPath + '/controllers/base/mainController');
/* GET home page. */
var ctrl_base = new Base();

router.get('/', function(req, res) {
  ctrl_base.displayCurrentCityWheather(req,(err,result) => {
  	   console.log("result-->"+result)
       res.render('index', { title: 'Express' });
  	});
});

module.exports = router;
