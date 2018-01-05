"use strict";
let contextPath = process.cwd(); // This is the context path of the application.

	let Bindable = require(contextPath + '/controllers/common/bindable.js');
	let WheatherController = require(contextPath + '/controllers/wheatherController.js');
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


	displayCurrentCityWheather(req,callback) {
       let wController = new WheatherController(req);
		wController.displayWheatherByAddress((err, result) => {
			callback(err,result);
		});
	}

}

module.exports = Controller;