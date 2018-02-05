/**
 * Created by swankhade on 26/10/15.
 * Model: Caste
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var castSchema = mongoose.Schema({
    name: String
});
// Apply the uniqueValidator plugin to castSchema.
castSchema.plugin(uniqueValidator);
var methods = {
    create: function(CasteInput, callback) {
        logger.info('Start: Caste create');
        logger.info('CasteInput =' + JSON.stringify(CasteInput));
        var result = "";
        var CasteData = CasteInput;
        Caste.create(CasteData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to Caste:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, CasteInput, callback) {
        logger.info('Start: Caste create');
        logger.info('Input id =' + id);
        logger.info('CasteInput =' + JSON.stringify(CasteInput));
        var result = "";
        var CasteData = CasteInput;
        Caste.findByIdAndUpdate(id, CasteData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to Caste:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: Caste getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        Caste.findOne({
            _id: id
        }).exec(function(err, CasteRecord) {
            if (err) {
                console.log('Error while obtaining record Caste with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(CasteRecord));
                result = CasteRecord;
                callback(err, result);
            }
        });
    },
        getAll: function(callback) {
        logger.info('Start: Caste getAll');
        // logger.info('Input id =' + id);
        var result = ""
        // if (!id || id == '') {
        //     console.log('Invalid or no input id');
        //     callback(err, result);
        // }
        Caste.find({}).exec(function(err, CasteRecords) {
            if (err) {
                console.log('Error while obtaining record Caste=',err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(CasteRecords));
                result = CasteRecords;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start Caste delete");
        logger.info('Input id =' + id);
        var result = "";
        Caste.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record Caste with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Caste record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Caste = mongoose.model('caste', castSchema);
module.exports = Caste;
module.exports.methods = methods;