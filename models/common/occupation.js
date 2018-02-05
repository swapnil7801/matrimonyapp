/**
 * Created by swankhade on 26/10/15.
 * Model: occ
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var occupationSchema = mongoose.Schema({
    name: String,
  
});
// Apply the uniqueValidator plugin to occupationSchema.
occupationSchema.plugin(uniqueValidator);
var methods = {
    create: function(occInput, callback) {
        logger.info('Start: occ create');
        logger.info('occInput =' + JSON.stringify(occInput));
        var result = "";
        var occData = occInput;
        Occupation.create(occData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to occ:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, occInput, callback) {
        logger.info('Start: occ create');
        logger.info('Input id =' + id);
        logger.info('occInput =' + JSON.stringify(occInput));
        var result = "";
        var occData = occInput;
        Occupation.findByIdAndUpdate(id, occData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to occ:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: occ getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        Occupation.findOne({
            _id: id
        }).exec(function(err, occRecord) {
            if (err) {
                console.log('Error while obtaining record occ with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(occRecord));
                result = occRecord;
                callback(err, result);
            }
        });
    },
         getAll: function(callback) {
        logger.info('Start: Occupation getAll');
        // logger.info('Input id =' + id);
        var result = ""
        Occupation.find({}).exec(function(err, OccupationRecords) {
            if (err) {
                console.log('Error while obtaining record Occupation=',err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(OccupationRecords));
                result = OccupationRecords;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start occ delete");
        logger.info('Input id =' + id);
        var result = "";
        Occupation.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record occ with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('occ record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Occupation = mongoose.model('occupation', occupationSchema);
module.exports = Occupation;
module.exports.methods = methods;