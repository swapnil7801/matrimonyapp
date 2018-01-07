"use strict";
let contextPath = process.cwd(); // This is the context path of the application.

let Bindable = require(contextPath + '/controllers/common/bindable.js');
let UserController = require(contextPath + '/controllers/userController.js');
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
		let output={};
		userController.userSignUp((err, result) => {
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
		userLogin(req, callback) {
		let userController = new UserController(req);
		let output={};
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

}

module.exports = Controller;