/**
 * Created by swankhade on 26/10/15.
 * Model: height
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var height = mongoose.Schema({
    name: String
    
});
// Apply the uniqueValidator plugin to height.
height.plugin(uniqueValidator);
var methods = {
    create: function(heightInput, callback) {
        logger.info('Start: height create');
        logger.info('heightInput =' + JSON.stringify(heightInput));
        var result = "";
        var heightData = heightInput;
        Height.create(heightData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to height:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, heightInput, callback) {
        logger.info('Start: height create');
        logger.info('Input id =' + id);
        logger.info('heightInput =' + JSON.stringify(heightInput));
        var result = "";
        var heightData = heightInput;
        Height.findByIdAndUpdate(id, heightData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to height:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: height getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        Height.findOne({
            _id: id
        }).exec(function(err, heightRecord) {
            if (err) {
                console.log('Error while obtaining record height with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(heightRecord));
                result = heightRecord;
                callback(err, result);
            }
        });
    },
      getAll: function(callback) {
        logger.info('Start: Height getAll');
        // logger.info('Input id =' + id);
        var result = ""
        Height.find({}).exec(function(err, HeightRecords) {
            if (err) {
                console.log('Error while obtaining record Height=',err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(HeightRecords));
                result = HeightRecords;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start height delete");
        logger.info('Input id =' + id);
        var result = "";
        Height.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record height with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('height record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Height = mongoose.model('height', height);
module.exports = Height;
module.exports.methods = methods;