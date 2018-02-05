/**
 * Created by swankhade on 26/10/15.
 * Model: weight
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var weightSchema = mongoose.Schema({
    name: String
});
// Apply the uniqueValidator plugin to weightSchema.
weightSchema.plugin(uniqueValidator);
var methods = {
    create: function(wInput, callback) {
        logger.info('Start: weight create');
        logger.info('wInput =' + JSON.stringify(wInput));
        var result = "";
        var weightData = wInput;
        Weight.create(weightData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to weight:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, wInput, callback) {
        logger.info('Start: weight create');
        logger.info('Input id =' + id);
        logger.info('wInput =' + JSON.stringify(wInput));
        var result = "";
        var weightData = wInput;
        Weight.findByIdAndUpdate(id, weightData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to weight:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: weight getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        Weight.findOne({
            _id: id
        }).exec(function(err, weightRecord) {
            if (err) {
                console.log('Error while obtaining record weight with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(weightRecord));
                result = weightRecord;
                callback(err, result);
            }
        });
    },
    getAll: function(callback) {
        logger.info('Start: Weight getAll');
        // logger.info('Input id =' + id);
        var result = ""
        Weight.find({}).exec(function(err, WeightRecords) {
            if (err) {
                console.log('Error while obtaining record Weight=', err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(WeightRecords));
                result = WeightRecords;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start weight delete");
        logger.info('Input id =' + id);
        var result = "";
        Weight.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record weight with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('weight record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Weight = mongoose.model('weight', weightSchema);
module.exports = Weight;
module.exports.methods = methods;