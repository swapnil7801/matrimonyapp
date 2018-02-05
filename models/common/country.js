/**
 * Created by swankhade on 26/10/15.
 * Model: country
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var countrySchema = mongoose.Schema({
    name: String
});
// Apply the uniqueValidator plugin to countrySchema.
countrySchema.plugin(uniqueValidator);
var methods = {
    create: function(countryInput, callback) {
        logger.info('Start: country create');
        logger.info('countryInput =' + JSON.stringify(countryInput));
        var result = "";
        var countryData = countryInput;
        Country.create(countryData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to country:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, countryInput, callback) {
        logger.info('Start: country create');
        logger.info('Input id =' + id);
        logger.info('countryInput =' + JSON.stringify(countryInput));
        var result = "";
        var countryData = countryInput;
        Country.findByIdAndUpdate(id, countryData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to country:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: country getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        Country.findOne({
            _id: id
        }).exec(function(err, countryRecord) {
            if (err) {
                console.log('Error while obtaining record country with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(countryRecord));
                result = countryRecord;
                callback(err, result);
            }
        });
    },
        getAll: function(callback) {
        logger.info('Start: Country getAll');
        // logger.info('Input id =' + id);
        var result = ""
        Country.find({}).exec(function(err, CountryRecords) {
            if (err) {
                console.log('Error while obtaining record Country=',err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(CountryRecords));
                result = CountryRecords;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start country delete");
        logger.info('Input id =' + id);
        var result = "";
        Country.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record country with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('country record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Country = mongoose.model('country', countrySchema);
module.exports = Country;
module.exports.methods = methods;