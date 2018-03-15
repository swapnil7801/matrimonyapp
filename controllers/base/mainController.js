"use strict";
let contextPath = process.cwd(); // This is the context path of the application.

let Bindable = require(contextPath + '/controllers/common/bindable.js');
let UserController = require(contextPath + '/controllers/userController.js');
let DropDownController = require(contextPath + '/controllers/dropDownController.js');
let requestUtil = require(contextPath + '/utils/requestUtility.js');

class Controller extends Bindable {

	/**
	 * Sends the given error or data back to response.
	 * @param  {Error} 		err 			- is the error object.
	 * @param  {Object} 	data 			- result data.
	 * @param  {Response} 	response 		- response object to send the result to.
	 */
	_sendToResponse(err, data, response) {
		if (err) {
			if (err == 401) {
				response.status(401).send();
			} else {
				logger.error(err);
				response.status(500).send();
			}
		} else {
			response.status(200).json(data);
		}
	}


	userSignUp(req, callback) {
		let userController = new UserController(req);
		let output = {};
		userController.userSignUp((err, result) => {
			if (err) {
				if (err == 'Mobile already registered') {
					output.status = 2;
				} else if (err == 'Email already registered') {
					output.status = 3;
				} else {
					output.status = 4;
				}
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	userLogin(req, callback) {
		let userController = new UserController(req);
		let output = {};
		userController.userLogin((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	resendOtp(req, callback) {
		let userController = new UserController(req);
		let output = {};
		userController.resendOtp((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	verifyOtp(req, callback) {
		let userController = new UserController(req);
		let output = {};
		userController.verifyOtp((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	updateProfile(req, callback) {
		let userController = new UserController(req);
		let output = {};
		userController.updateProfile((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}

	getUser(req, callback) {
		let userController = new UserController(req);
		let output = {};
		userController.getUser((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
		getUserRaw(req, callback) {
		let userController = new UserController(req);
		let output = {};
		userController.getUserRaw((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}

	addCaste(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addCaste((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getCaste(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getCaste((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	addEducation(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addEducation((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getEducation(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getEducation((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	addCity(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addCity((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getCity(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getCity((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	addColor(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addColor((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getColor(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getColor((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	addCountry(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addCountry((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getCountry(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getCountry((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	addGotra(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addGotra((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getGotra(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getGotra((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getSubCaste(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getGotraByCaste((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	addHeight(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addHeight((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getHeight(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getHeight((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	addOccupation(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addOccupation((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getOccupation(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getOccupation((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	addSalary(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addSalary((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getSalary(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getSalary((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	addState(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addState((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getState(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getState((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	addWeight(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.addWeight((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getWeight(req, callback) {
		let dropDownController = new DropDownController(req);
		let output = {};
		dropDownController.getWeight((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getUserList(req, callback) {
		let userController = new UserController(req);
		// let dropDownController = new DropDownController(req);
		let output = {};
		userController.getUserList((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	shortlistUser(req, callback) {
		let userController = new UserController(req);
		// let dropDownController = new DropDownController(req);
		let output = {};
		userController.shortlistUser((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	removeShortListedUser(req, callback) {
		let userController = new UserController(req);
		// let dropDownController = new DropDownController(req);
		let output = {};
		userController.removeShortListedUser((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	getShorListedUsers(req, callback) {
		let userController = new UserController(req);
		// let dropDownController = new DropDownController(req);
		let output = {};
		userController.getShorListedUsers((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}

		getAllUserList(req, callback) {
		let userController = new UserController(req);
		// let dropDownController = new DropDownController(req);
		let output = {};
		userController.getAllUserList((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}

	   getFilterUserList(req, callback) {
		let userController = new UserController(req);

		// let dropDownController = new DropDownController(req);
		let output = {};
		userController.getFilterUserList((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
	   uploadProfilePic(req, callback) {
		let userController = new UserController(req);
		
		// let dropDownController = new DropDownController(req);
		let output = {};
		userController.uploadProfilePic((err, result) => {
			if (err) {
				output.status = 2;
				output.data = err;
				callback(output);
			} else {
				output.status = 1;
				output.data = result;
				callback(output);
			}
		});
	}
}

module.exports = Controller;