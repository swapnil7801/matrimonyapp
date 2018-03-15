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
router.get('/otp/:mobileNo', function(req, res) {
   ctrl_base.resendOtp(req,(result) => {
  	   res.send(result);
  	});
});
router.put('/updateProfile/:id', function(req, res) {
   ctrl_base.updateProfile(req,(result) => {
  	   res.send(result);
  	});
});
router.get('/verifyOtp/:mobileno/:otp', function(req, res) {
   ctrl_base.verifyOtp(req,(result) => {
  	   res.send(result);
  	});
});
router.get('/profile/:id', function(req, res) {
   ctrl_base.getUser(req,(result) => {
  	   res.send(result);
  	});
});
router.get('/profileRaw/:id', function(req, res) {
   ctrl_base.getUserRaw(req,(result) => {
       res.send(result);
    });
});
router.get('/get/userList/:offset', function(req, res) {
   ctrl_base.getUserList(req,(result) => {
       res.send(result);
    });
});
router.post('/shortListUser', function(req, res) {
   ctrl_base.shortlistUser(req,(result) => {
       res.send(result);
    });
});

router.get('/get/allUserList', function(req, res) {
   ctrl_base.getAllUserList(req,(result) => {
       res.send(result);
    });
});

router.get('/getShorListedUsers/:user_id', function(req, res) {
   ctrl_base.getShorListedUsers(req,(result) => {
       res.send(result);
    });
});
router.post('/removeShortListedUser', function(req, res) {
   ctrl_base.removeShortListedUser(req,(result) => {
       res.send(result);
    });
});

router.get('/get/filterUserList', function(req, res) {
   ctrl_base.getFilterUserList(req,(result) => {
       res.send(result);
    });
});

router.post('/uploadProfilePic/:id', function(req, res) {
   ctrl_base.uploadProfilePic(req,(result) => {
       res.send(result);
    });
});
module.exports = router;
