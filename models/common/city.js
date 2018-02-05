/**
 * Created by swankhade on 26/10/15.
 * Model: City
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var CitySchema = mongoose.Schema({
     name: String
   
});
// Apply the uniqueValidator plugin to CitySchema.
CitySchema.plugin(uniqueValidator);
var methods = {
    create: function(CityInput, callback) {
        logger.info('Start: City create');
        logger.info('CityInput =' + JSON.stringify(CityInput));
        var result = "";
        var CityData = CityInput;
        City.create(CityData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to City:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, CityInput, callback) {
        logger.info('Start: City create');
        logger.info('Input id =' + id);
        logger.info('CityInput =' + JSON.stringify(CityInput));
        var result = "";
        var CityData = CityInput;
        City.findByIdAndUpdate(id, CityData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to City:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: City getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        City.findOne({
            _id: id
        }).exec(function(err, CityRecord) {
            if (err) {
                console.log('Error while obtaining record City with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(CityRecord));
                result = CityRecord;
                callback(err, result);
            }
        });
    },
     getAll: function(callback) {
        logger.info('Start: City getAll');
        // logger.info('Input id =' + id);
        var result = ""
        City.find({}).exec(function(err, CityRecords) {
            if (err) {
                console.log('Error while obtaining record City=',err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(CityRecords));
                result = CityRecords;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start City delete");
        logger.info('Input id =' + id);
        var result = "";
        City.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record City with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('City record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var City = mongoose.model('city', CitySchema);
module.exports = City;
module.exports.methods = methods;