var express = require('express');
var router = express.Router();
let contextPath = process.cwd(); // This is the context path of the application.

let Base=require(contextPath + '/controllers/base/mainController');
/* GET home page. */
var ctrl_base = new Base();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signUp', function(req, res) {
   ctrl_base.userSignUp(req,(result) => {
  	   res.send(result);
  	});
}); 
router.post('/login', function(req, res) {
   ctrl_base.userLogin(req,(result) => {
  	   res.send(result);
  	});
}); 
module.exports = router;
