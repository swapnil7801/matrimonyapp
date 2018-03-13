"use strict";
let contextPath = process.cwd(); // This is the context path of the application.
let logger = require(contextPath + '/utils/logger.js');

let Bindable = require(contextPath + '/controllers/common/bindable.js');
let requestUtil = require(contextPath + '/utils/requestUtility.js');
let config = require(contextPath + '/config/app_config.js');
let users = require(contextPath + '/models/common/user.js');
let favourites = require(contextPath + '/models/common/favourite.js');
var data = "do shash'owania";
var crypto = require('crypto');
let async = require('async');
var twilio = require('twilio');
var client = new twilio(config.twilio_accountSid, config.twilio_authToken);
var cloudinary = require('cloudinary')
cloudinary.config({ 
  cloud_name: config.Cloudname, 
  api_key: config.APIKey, 
  api_secret: config.APISecret 
});
class UserController extends Bindable {

	constructor(request) {
		super();
		this.request = request;
		this.users = users;
		this.users.methods = users.methods;
		this.favourites = favourites;
		this.favourites.methods = favourites.methods;
	}


	userSignUp(callback) {
		var body = this.request.body;
		var dob = new Date(this.request.body.dob);
		body.dob = dob;
		body.role = 'user';
		body.password = crypto.createHash('md5').update(body.password).digest("hex");
		var mobileno = this.request.body.mobileno;
		var password = this.request.body.password;
		var userRecord = {};
		var userData
		var otp;
		var self = this;
		// console.log(body);
		console.log(this.users.methods);
		async.series([function(done) {
				//check mobile and password
				done();
			}, function(done) {
				//check if already in db
				self.users.methods.getByMobile(mobileno, (err, result) => {
					if (err) {
						callback(err, null);
					} else {
						if (!result) {
							done();
						} else {
							// console.log("userMobile already registered");
							callback('Mobile already registered', null)
						}
					}
				});
			}, function(done) {
				//insert in db and send otp and user id
				otp = Math.floor(1000 + Math.random() * 9000);
				body.otp = otp;
				self.users.create(body, (err, result) => {
					if (err) {
						console.log("err->",err.code);
						if(err.code=='11000'){
						callback('Email already registered', null);
						console.log("userEmail already registered");
						}else{
							callback('validation Failed',null);
						}
					} else {
						userData = result;
						done();
					}
				})
			}, function(done) {
				// send OTP
				// logger.info("msg body->",body);
				// logger.info("from->",config.twilio_no);
				var toMobile = '+91' + mobileno;
				// logger.info("to->",toMobile);
				// logger.info("to->",toMobile);
				// logger.info("type->",typeof(toMobile));
				///message code
				client.messages.create({
						body: 'Thank you for registering to Matrimony App ,Your OTP is: ' + otp,
						to: toMobile, // Text this number
						from: config.twilio_no // From a valid Twilio number
					})
					.then((message) => {
						console.log(message.sid);
					});
				//message code end
				done();
			},
			function(done) {
				setTimeout(function() {
					self.users.methods.getById(userData._id, (err, result) => {
						if (err) {
							logger.info("error getting data for", userData._id)
						} else {
							var userRes = result;
							userRes.otp = null;
							self.users.methods.update(userData._id, userRes, (err, result) => {
								if (err) {
									logger.info("err removing OTP for user", err, userData._id);
								} else {
									logger.info("OTP removed for user", userData._id);
								}
							})
						}
					})
					// }, 3000);
				}, 1000 * 60 * 5);
				done();
			}
		], function(err) {
			///main method;
			console.log("user creted and otp sent");

			callback(null, userData._id);
		})

	}
	resendOtp(callback) {
		var mobileno = this.request.params.mobileNo;
		var self = this;
		var userData = {};
		async.series([function(done) {
			self.users.methods.getByMobile(mobileno, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
					if (!result) {
						callback('mobile not registered', null)
					} else {
						userData = result;
						done();
					}
				}
			});
		}, function(done) {
			userData.otp = Math.floor(1000 + Math.random() * 9000);
			self.users.methods.update(userData._id, userData, (err, result) => {
				if (err) {
					logger.info("err removing OTP for user", err, userData._id);
					callback(err, null);
				} else {
					logger.info("OTP updated for user", userData._id);
					done();

				}
			})

		}, function(done) {
			var toMobile = '+91' + mobileno;
			// logger.info("to->",toMobile);
			// logger.info("to->",toMobile);
			// logger.info("type->",typeof(toMobile));
			///message code
			client.messages.create({
					body: 'Thank you for registering to Matrimony App ,Your new OTP is: ' + userData.otp,
					to: toMobile, // Text this number
					from: config.twilio_no // From a valid Twilio number
				})
				.then((message) => {
					console.log("sms sent*************************")
					console.log(message.sid);
				});
			//message code end
			done();
		}, function(done) {

			setTimeout(function() {
				userData.otp = null;
				self.users.methods.update(userData._id, userData, (err, result) => {
					if (err) {
						logger.info("err removing OTP for user", err, userData._id);
					} else {
						logger.info("OTP removed for user", userData._id);
					}
				})
				// }, 3000);
			}, 1000 * 60 * 5);
			done();

		}], function(err) {
			callback(null, "OTP sent to users mobile");
		})

	}
	updateProfile(callback) {
		var user_id = this.request.params.id;
		var body = this.request.body;
		var self = this;
		var db_user_data = {};
		var user_obj = {};
		var update_obj = {};
		async.series([function(done) {
			//
			self.users.methods.getById(user_id, (err, res) => {
				if (err) {
					// callback(err, null);
					done(err);
				} else {
					db_user_data = res;
					done();
				}
			})
		}, function(done) {
			console.log(" object1", db_user_data);
			console.log("  object2", body);

			update_obj = Object.assign(db_user_data, body);
			console.log("updated object", update_obj);
			self.users.methods.update(user_id, update_obj, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
					done();
				}
			})
		}, function(done) {
			done();
		}], function(err) {
			if (err) {
				callback("error in profile update " + err, null);
			} else {
				callback(null, "user profile updated")
			}
		})

	}

	verifyOtp(callback) {
		var mobileno = this.request.params.mobileno;
		var otp = this.request.params.otp;
		var userData = {};
		var outputRecord = {};
		var self = this;
		async.series([function(done) {
			self.users.methods.getByMobile(mobileno, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
					if (!result) {
						done('mobile not registered')
					} else {
						userData = result;
						done();
					}
				}
			});
		}, function(done) {
			if (userData.otp == otp) {
				done()
			} else {
				done('incorrectOtp')
			}

		}], function(err) {
			if (err) {
				callback(err, null)
			} else {
				// delete userData.prototype.password;
				outputRecord = JSON.parse(JSON.stringify(userData));
				delete outputRecord.password;
				delete outputRecord.otp;
				callback(null, outputRecord);
			}

		})

	}

	getUser(callback) {
		var user_id = this.request.params.id;
		var userData = {};
		var outputRecord;
		var self = this;
		async.series([function(done) {
			self.users.methods.getDetailById(user_id, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
					if (!result) {
						done('user Not found')
					} else {
						userData = result;
						done();
					}
				}
			});
		}, function(done) {
			outputRecord = JSON.parse(JSON.stringify(userData));

			delete outputRecord.password;
			delete outputRecord.otp;
			done();

		}], function(err) {
			if (err) {
				callback(err, null)
			} else {
				callback(null, outputRecord)
			}

		})

	}
	getUserList(callback) {
		var offset = this.request.params.offset;
		var userData = {};
		var outputRecord;
		var self = this;
		async.series([function(done) {
			self.users.methods.getAll(offset, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
					if (!result) {
						done('user Not found')
					} else {
						userData = result;
						done();
					}
				}
			});
		}, function(done) {
			//  outputRecord = JSON.parse(JSON.stringify(userData));

			// delete outputRecord.password;
			// delete outputRecord.otp;
			done();

		}], function(err) {
			if (err) {
				callback(err, null)
			} else {
				callback(null, userData)
			}

		})

	}

	shortlistUser(callback) {
		var own_user_id = this.request.body.own_user_id;
		var shortlist_user_id = this.request.body.shortlist_user_id;
		var userData = {};
		var outputRecord;
		var user_obj;
		var self = this;
		async.series([function(done) {
			self.favourites.methods.getById(own_user_id, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
					if (!result) {
						//if not present insert document

						// done('favourites Not found')
						user_obj = {
							user_id: own_user_id,
							favUsers: [shortlist_user_id]
						}
						self.favourites.methods.create(user_obj, (err, result) => {
							if (err) {
								done('err while creating userFav', err);
							} else {
								done();
							}
						})
					} else {
						//else update///
						userData = result;
						// logger.info('userData',JSON.stringify(userData,null,4));
						logger.info('updating.....', userData._id, shortlist_user_id)
						self.favourites.methods.update(userData._id, shortlist_user_id, (err, result) => {
							if (err) {
								logger.error('err', err);
								done('err while creating userFav');
							} else {
								logger.info('result', result);
								done();
							}
						})
					}
				}
			});
		}, function(done) {
			//  outputRecord = JSON.parse(JSON.stringify(userData));

			// delete outputRecord.password;
			// delete outputRecord.otp;
			done();

		}], function(err) {
			if (err) {
				callback(err, null)
			} else {
				callback(null, 'success')
			}

		})

	}
	removeShortListedUser(callback) {
		var own_user_id = this.request.body.own_user_id;
		var shortlist_user_id = this.request.body.shortlist_user_id;
		var userData = {};
		var outputRecord;
		var user_obj;
		var self = this;
		async.series([function(done) {
			self.favourites.methods.getById(own_user_id, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
					if (!result) {
						done();
					} else {
						//else update///
						userData = result;
						// logger.info('userData',JSON.stringify(userData,null,4));
						logger.info('updating.....', userData._id, shortlist_user_id)
						self.favourites.methods.removefromFav(userData._id, shortlist_user_id, (err, result) => {
							if (err) {
								logger.error('err', err);
								done('err while removing userFav');
							} else {
								logger.info('result', result);
								done();
							}
						})
					}
				}
			});
		}, function(done) {
			//  outputRecord = JSON.parse(JSON.stringify(userData));

			// delete outputRecord.password;
			// delete outputRecord.otp;
			done();

		}], function(err) {
			if (err) {
				callback(err, null)
			} else {
				callback(null, 'success')
			}

		})

	}
	getShorListedUsers(callback) {
		var user_id = this.request.params.user_id;
		var userData = {};
		var outputRecord;
		var user_obj;
		var self = this;
		async.series([function(done) {
			self.favourites.methods.getShortListedById(user_id, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
					userData = result;
					done();
				}
			});
		}, function(done) {
			//  outputRecord = JSON.parse(JSON.stringify(userData));

			// delete outputRecord.password;
			// delete outputRecord.otp;
			done();

		}], function(err) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, userData);
			}

		})

	}


	userLogin(callback) {
		var body = this.request.body;
		var mobileno = body.mobileno;
		var reqPassword = body.password;
		let userRecord = {};
		var self = this;
		async.series([function(done) {
			self.users.methods.getByMobile(mobileno, (err, result) => {
				if (err) {
					callback('mobileno incorrect', null);
				} else {
					// console.log('userRecord->',userRecord);
					if (!result) {
						callback('mobileno not found', null)
					} else {
						userRecord = result;
						done();
					}

				}
			});
		}, function(done) { //check password
			reqPassword = crypto.createHash('md5').update(reqPassword).digest("hex");
			if (reqPassword == userRecord.password) {
				// delete userRecord.password;
				// callback(null, userRecord);
				done();
			} else {
				callback('password incorrect', null)
			}
		}, function(done) {
			// delete userRecord.password;
			var outputRecord = JSON.parse(JSON.stringify(userRecord));
			outputRecord.id = outputRecord._id;
			delete outputRecord._id;
			delete outputRecord.password;
			delete outputRecord.otp;

			console.log("userRecord-->", outputRecord);
			callback(null, outputRecord);

		}], function(err) {
			// callback(null,err);
		})

	}


		getAllUserList(callback) {
		var offset = this.request.params.offset;
		var userData = {};
		var outputRecord;
		var self = this;
		async.series([function(done) {
			self.users.methods.getAllUserAdmin((err, result) => {
				if (err) {
					callback(err, null);
				} else {
					if (!result) {
						done('user Not found')
					} else {
						userData = result;
						done();
					}
				}
			});
		}, function(done) {
			//  outputRecord = JSON.parse(JSON.stringify(userData));

			// delete outputRecord.password;
			// delete outputRecord.otp;
			done();

		}], function(err) {
			if (err) {
				callback(err, null)
			} else {
				callback(null, userData)
			}

		})

	}

		uploadProfilePic(callback){
		var user_id = this.request.params.id;
		var reqObj = {};
		 reqObj.profile='';
		var self = this;
		var db_user_data = {};
		var user_obj = {};
		var update_obj = {};
		async.series([function(done) {
			//
			self.users.methods.getById(user_id, (err, res) => {
				if (err) {
					// callback(err, null);
					done(err);
				} else {
					db_user_data = res;
					done();
				}
			})
		},function(done){
			// reqObj.profile='test';
			console.log("*******************************************");
			// console.log(self.request.files);
			console.log("*******************************************");
			// cloudinary.v2.uploader.upload(self.request.files.profile.data,
   //  			function(error, result){
   //  				console.log(error)
   //  				console.log(result)
   //  				done();
   //  			});
			cloudinary.v2.uploader.upload_stream({
						resource_type: 'auto',tags:['user']
					},
					function(error, result) {
						console.log(error)
						console.log(result)
						reqObj.profile=result.url;
						done();
					})
				.end(self.request.files.profile.data);

			
		}, function(done) {
			console.log(" object1", db_user_data);
			console.log("  object2", reqObj);

			update_obj = Object.assign(db_user_data, reqObj);
			console.log("updated object", update_obj);
			self.users.methods.update(user_id, update_obj, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
					done();
				}
			})
		}, function(done) {
			done();
		}], function(err) {
			if (err) {
				callback("error in profile update " + err, null);
			} else {
				callback(null, "user profile updated")
			}
		})

	}
	getFilterUserList(callback) {
		console.log("QueryParams-",this.request.query)

		var offset = this.request.query.offset;
		var minAge = this.request.query.minAge;
		var maxAge = this.request.query.maxAge;
		var minSalary = this.request.query.minSalary;
		var maxSalary = this.request.query.maxSalary;
		var minHeight = this.request.query.minHeight;
		var maxHeight = this.request.query.maxHeight;

		var userData = {};
		var outputRecord;
		var self = this;
		async.series([function(done) {
			 // if(offset && minHeight &&maxHeight && minSalary && maxSalary &&)

			done();

		},function(done) {
			self.users.methods.getFilteredUser(self.request.query, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
					if (!result) {
						done('user Not found')
					} else {
						userData = result;
						done();
					}
				}
			});
		}, function(done) {
			//  outputRecord = JSON.parse(JSON.stringify(userData));

			// delete outputRecord.password;
			// delete outputRecord.otp;
			done();

		}], function(err) {
			if (err) {
				callback(err, null)
			} else {
				callback(null, userData)
			}

		})

	}

}

module.exports = UserController;