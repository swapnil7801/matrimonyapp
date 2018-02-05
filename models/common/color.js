/**
 * Created by swankhade on 26/10/15.
 * Model: color
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var colorSchema = mongoose.Schema({
    name: String
});
// Apply the uniqueValidator plugin to colorSchema.
colorSchema.plugin(uniqueValidator);
var methods = {
    create: function(colorInput, callback) {
        logger.info('Start: color create');
        logger.info('colorInput =' + JSON.stringify(colorInput));
        var result = "";
        var colorData = colorInput;
        color.create(colorData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to color:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, colorInput, callback) {
        logger.info('Start: color create');
        logger.info('Input id =' + id);
        logger.info('colorInput =' + JSON.stringify(colorInput));
        var result = "";
        var colorData = colorInput;
        color.findByIdAndUpdate(id, colorData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to color:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: color getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        color.findOne({
            _id: id
        }).exec(function(err, colorRecord) {
            if (err) {
                console.log('Error while obtaining record color with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(colorRecord));
                result = colorRecord;
                callback(err, result);
            }
        });
    },
         getAll: function(callback) {
        logger.info('Start: Color getAll');
        // logger.info('Input id =' + id);
        var result = ""
        color.find({}).exec(function(err, ColorRecords) {
            if (err) {
                console.log('Error while obtaining record Color=',err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(ColorRecords));
                result = ColorRecords;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start color delete");
        logger.info('Input id =' + id);
        var result = "";
        color.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record color with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('color record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var color = mongoose.model('color', colorSchema);
module.exports = color;
module.exports.methods = methods;