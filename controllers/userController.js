"use strict";
let contextPath = process.cwd(); // This is the context path of the application.

let Bindable = require(contextPath + '/controllers/common/bindable.js');
let requestUtil = require(contextPath + '/utils/requestUtility.js');
let config = require(contextPath + '/config/app_config.js');
let users = require(contextPath + '/models/common/user.js');
var data = "do shash'owania";
var crypto = require('crypto');
let async = require('async');
class UserController extends Bindable {

	constructor(request) {
		super();
		this.request = request;
		this.users = users;
		this.users.methods = users.methods;
	}


	userSignUp(callback) {
		var body = this.request.body;
		var dob = new Date(this.request.body.dob);
		body.dob = dob;
		body.role = 'user';
		body.password = crypto.createHash('md5').update(body.password).digest("hex");
		// console.log(body);
		console.log(this.users.methods);
		this.users.methods.create(body, (err, result) => {
			if (err) {
				callback(err, result);
			} else {
				callback(null, result);
			}

		});
		// callback(null,'user created');

	}
	userLogin(callback) {
		var body = this.request.body;
		var reqEmail = body.email;
		var reqPassword = body.password;
		let userRecord = {};
		var self = this;
		async.series([function(done) {
			self.users.methods.getByEmail(reqEmail, (err, result) => {
				if (err) {
					callback('email incorrect', null);
				} else {
					// console.log('userRecord->',userRecord);
					if (!result) {
						callback('email not found', null)
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
		},function(done){
			// delete userRecord.password;
			var outputRecord=JSON.parse(JSON.stringify(userRecord));
			outputRecord.id=outputRecord._id;
			delete outputRecord._id;
			delete outputRecord.password;
		
			console.log("userRecord-->",outputRecord);
			callback(null, outputRecord);

		}], function(err) {
			// callback(null,err);
		})

	}

}

module.exports = UserController;