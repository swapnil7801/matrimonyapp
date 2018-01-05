var _ = require('underscore');

module.exports = {

	/**
	 * Gets the right input object from request.
	 * @param 	{Request}	req		- is the request
	 * @return	{Object}			request object.
	 */
	getRequestObject: function(req) {
		return _.isEmpty(req.body) ? req.query : req.body;
	}

}
