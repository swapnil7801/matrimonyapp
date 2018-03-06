"use strict";
let contextPath = process.cwd(); // This is the context path of the application.
let logger = require(contextPath + '/utils/logger.js');

let Bindable = require(contextPath + '/controllers/common/bindable.js');
let config = require(contextPath + '/config/app_config.js');
let async = require('async');

let caste = require(contextPath + '/models/common/caste.js');
let education = require(contextPath + '/models/common/education.js');
let city = require(contextPath + '/models/common/city.js');
let color = require(contextPath + '/models/common/color.js');
let country = require(contextPath + '/models/common/country.js');
let gotra = require(contextPath + '/models/common/gotra.js');
let height = require(contextPath + '/models/common/height.js');
let occupation = require(contextPath + '/models/common/occupation.js');
let salary = require(contextPath + '/models/common/salaryRange.js');
let state = require(contextPath + '/models/common/state.js');
let weight = require(contextPath + '/models/common/weight.js');

class DropDownController extends Bindable {

	constructor(request) {
		super();
		this.request = request;
		this.caste = caste;
		this.city = city;
		this.education = education;
		this.caste.methods = caste.methods;
		this.education.methods = education.methods;
		this.city.methods = city.methods;
		this.color = color;
		this.color.methods = color.methods;
		this.country = country;
		this.country.methods = country.methods;
		this.gotra = gotra;
		this.gotra.methods = gotra.methods;
		this.height = height;
		this.height.methods = height.methods;
		this.occupation = occupation;
		this.occupation.methods = occupation.methods;
		this.salary = salary;
		this.salary.methods = salary.methods;
		this.state = state;
		this.state.methods = state.methods;
		this.weight = weight;
		this.weight.methods = weight.methods;
	}
	addEducation(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.education.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding caste ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}

	addCaste(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.caste.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding caste ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getEducation(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.education.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting caste ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getCaste(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.caste.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting caste ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getCity(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.city.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting city ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	addCity(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.city.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.city.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding city ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getColor(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.color.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting color ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	addColor(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.city.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.color.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding color ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getCountry(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.country.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting country ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	addCountry(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.city.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.country.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding country ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getGotra(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.gotra.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting gotra ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
		getGotraByCaste(callback) {
		var res;
		var self = this;
		// console.log(body);
		 // var casteID=this.request.query.casteId;
		 var casteID=this.request.params.casteId;
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.gotra.methods.getSubCaste(casteID,(err, result) => {
					if (err) {
						logger.info("error getting gotra ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	addGotra(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.city.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.gotra.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding gotra ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getHeight(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.height.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting height ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	addHeight(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.city.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.height.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding height ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getOccupation(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.occupation.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting occupation ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	addOccupation(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.city.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.occupation.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding occupation ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getSalary(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.salary.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting Salary ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	addSalary(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.city.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.salary.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding salary ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getState(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.state.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting State ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	addState(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.city.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.state.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding state ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	getWeight(callback) {
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.caste.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			},
			function(done) {
				self.weight.methods.getAll((err, result) => {
					if (err) {
						logger.info("error getting Weight ");
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}
	addWeight(callback) {
		var body = this.request.body;
		//var dob = new Date(this.request.body.dob);
		//body.dob = dob;
		var res;
		var self = this;
		// console.log(body);
		// console.log(this.city.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				done();
			}, function(done) {
				done();
			}, function(done) {
				done();
			},
			function(done) {
				self.weight.methods.create(body, (err, result) => {
					if (err) {
						logger.info("error adding Weight ", body)
						done(err);
					} else {
						res = result;
						done();
					}
				})
			}
		], function(err) {
			///main method;
			if (err) {
				callback(err, null);
			} else {
				callback(null, res);
			}
		})
	}


}

module.exports = DropDownController;