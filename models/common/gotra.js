/**
 * Created by swankhade on 26/10/15.
 * Model: Gotra
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var gotraSchema = mongoose.Schema({
    name: String
    
});
// Apply the uniqueValidator plugin to gotraSchema.
gotraSchema.plugin(uniqueValidator);
var methods = {
    create: function(GotraInput, callback) {
        logger.info('Start: Gotra create');
        logger.info('GotraInput =' + JSON.stringify(GotraInput));
        var result = "";
        var GotraData = GotraInput;
        Gotra.create(GotraData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to Gotra:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, GotraInput, callback) {
        logger.info('Start: Gotra create');
        logger.info('Input id =' + id);
        logger.info('GotraInput =' + JSON.stringify(GotraInput));
        var result = "";
        var GotraData = GotraInput;
        Gotra.findByIdAndUpdate(id, GotraData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to Gotra:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: Gotra getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        Gotra.findOne({
            _id: id
        }).exec(function(err, GotraRecord) {
            if (err) {
                console.log('Error while obtaining record Gotra with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(GotraRecord));
                result = GotraRecord;
                callback(err, result);
            }
        });
    },
        getAll: function(callback) {
        logger.info('Start: Gotra getAll');
        // logger.info('Input id =' + id);
        var result = ""
        Gotra.find({}).exec(function(err, GotraRecords) {
            if (err) {
                console.log('Error while obtaining record Gotra=',err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(GotraRecords));
                result = GotraRecords;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start Gotra delete");
        logger.info('Input id =' + id);
        var result = "";
        Gotra.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record Gotra with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Gotra record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Gotra = mongoose.model('gotra', gotraSchema);
module.exports = Gotra;
module.exports.methods = methods;