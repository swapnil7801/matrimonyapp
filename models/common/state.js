/**
 * Created by swankhade on 26/10/15.
 * Model: state
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var stateSchema = mongoose.Schema({
    name: String,
});
// Apply the uniqueValidator plugin to stateSchema.
stateSchema.plugin(uniqueValidator);
var methods = {
    create: function(stateInput, callback) {
        logger.info('Start: state create');
        logger.info('stateInput =' + JSON.stringify(stateInput));
        var result = "";
        var stateData = stateInput;
        State.create(stateData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to state:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, stateInput, callback) {
        logger.info('Start: state create');
        logger.info('Input id =' + id);
        logger.info('stateInput =' + JSON.stringify(stateInput));
        var result = "";
        var stateData = stateInput;
        State.findByIdAndUpdate(id, stateData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to state:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: state getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        State.findOne({
            _id: id
        }).exec(function(err, stateRecord) {
            if (err) {
                console.log('Error while obtaining record state with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(stateRecord));
                result = stateRecord;
                callback(err, result);
            }
        });
    },
         getAll: function(callback) {
        logger.info('Start: State getAll');
        // logger.info('Input id =' + id);
        var result = ""
        State.find({}).exec(function(err, StateRecords) {
            if (err) {
                console.log('Error while obtaining record State=',err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(StateRecords));
                result = StateRecords;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start state delete");
        logger.info('Input id =' + id);
        var result = "";
        State.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record state with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('state record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var State = mongoose.model('state', stateSchema);
module.exports = State;
module.exports.methods = methods;