"use strict";
let contextPath = process.cwd(); // This is the context path of the application.

let Bindable = require(contextPath + '/controllers/common/bindable.js');
let requestUtil = require(contextPath + '/utils/requestUtility.js');
let requestIp = require('request-ip');
let rest_client = require('node-rest-client');
let client = new rest_client.Client();
let config = require(contextPath + '/config/config.js');
const http = require('http');

class WheatherController extends Bindable {

	constructor(request) {
		super();
		this.request = request;
	}

	displayWheatherByAddress(callback) {
		let result;
		let err = null;
		let clientIp = requestIp.getClientIp(this.request);
		let city;
		result = "welcome to Express APP with ES6";
		console.log("IN WheatherController |displayWheatherByAddress() " + clientIp);
		// 115.117.44.95
		let url = 'http://freegeoip.net/json/' + clientIp;

		http.get('http://freegeoip.net/json/115.117.44.95', (res) => {
			console.log('statusCode: ', res.statusCode);
			res.on('data', (ipOutput) => {
				ipOutput = JSON.parse(ipOutput);
				// http://api.openweathermap.org/data/2.5/forecast/daily?q=pune&units=metric&cnt=16&appid=3b5c3d8cbb9ea8244edce2a57cd0cbb4
				city = ipOutput.city; ///pune
                console.log("city-"+city);


			});

		}).on('error', (e) => {
			console.error(e);
		});
		callback(err, result);
	}


}

module.exports = WheatherController;