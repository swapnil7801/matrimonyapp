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
router.post('/caste', function(req, res) {
   ctrl_base.addCaste(req,(result) => {
  	   res.send(result);
  	});
}); 
router.get('/caste', function(req, res) {
   ctrl_base.getCaste(req,(result) => {
       res.send(result);
    });
});
router.post('/education', function(req, res) {
   ctrl_base.addEducation(req,(result) => {
       res.send(result);
    });
}); 
router.get('/education', function(req, res) {
   ctrl_base.getEducation(req,(result) => {
       res.send(result);
    });
});
router.post('/city', function(req, res) {
   ctrl_base.addCity(req,(result) => {
       res.send(result);
    });
}); 
router.get('/city', function(req, res) {
   ctrl_base.getCity(req,(result) => {
       res.send(result);
    });
});
router.post('/color', function(req, res) {
   ctrl_base.addColor(req,(result) => {
       res.send(result);
    });
}); 
router.get('/color', function(req, res) {
   ctrl_base.getColor(req,(result) => {
       res.send(result);
    });
});
router.post('/country', function(req, res) {
   ctrl_base.addCountry(req,(result) => {
       res.send(result);
    });
}); 
router.get('/country', function(req, res) {
   ctrl_base.getCountry(req,(result) => {
       res.send(result);
    });
});
router.post('/gotra', function(req, res) {
   ctrl_base.addGotra(req,(result) => {
       res.send(result);
    });
}); 
router.get('/gotra', function(req, res) {
   ctrl_base.getGotra(req,(result) => {
       res.send(result);
    });
});
router.post('/height', function(req, res) {
   ctrl_base.addHeight(req,(result) => {
       res.send(result);
    });
}); 
router.get('/height', function(req, res) {
   ctrl_base.getHeight(req,(result) => {
       res.send(result);
    });
});
router.post('/occupation', function(req, res) {
   ctrl_base.addOccupation(req,(result) => {
       res.send(result);
    });
}); 
router.get('/occupation', function(req, res) {
   ctrl_base.getOccupation(req,(result) => {
       res.send(result);
    });
});
router.post('/salary', function(req, res) {
   ctrl_base.addSalary(req,(result) => {
       res.send(result);
    });
}); 
router.get('/salary', function(req, res) {
   ctrl_base.getSalary(req,(result) => {
       res.send(result);
    });
});
router.post('/state', function(req, res) {
   ctrl_base.addState(req,(result) => {
       res.send(result);
    });
}); 
router.get('/state', function(req, res) {
   ctrl_base.getState(req,(result) => {
       res.send(result);
    });
}); 
router.post('/weight', function(req, res) {
   ctrl_base.addWeight(req,(result) => {
       res.send(result);
    });
}); 
router.get('/weight', function(req, res) {
   ctrl_base.getWeight(req,(result) => {
       res.send(result);
    });
}); 
router.get('/subCaste/:casteId', function(req, res) {
   ctrl_base.getSubCaste(req,(result) => {
       res.send(result);
    });
});              
module.exports = router;
