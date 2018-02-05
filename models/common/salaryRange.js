/**
 * Created by swankhade on 26/10/15.
 * Model: sal
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var salarySchema = mongoose.Schema({
    name: String
});
// Apply the uniqueValidator plugin to salarySchema.
salarySchema.plugin(uniqueValidator);
var methods = {
    create: function(salInput, callback) {
        logger.info('Start: sal create');
        logger.info('salInput =' + JSON.stringify(salInput));
        var result = "";
        var salData = salInput;
        Salary.create(salData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to sal:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, salInput, callback) {
        logger.info('Start: sal create');
        logger.info('Input id =' + id);
        logger.info('salInput =' + JSON.stringify(salInput));
        var result = "";
        var salData = salInput;
        Salary.findByIdAndUpdate(id, salData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to sal:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: sal getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        Salary.findOne({
            _id: id
        }).exec(function(err, salRecord) {
            if (err) {
                console.log('Error while obtaining record sal with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(salRecord));
                result = salRecord;
                callback(err, result);
            }
        });
    },
        getAll: function(callback) {
        logger.info('Start: Salary getAll');
        // logger.info('Input id =' + id);
        var result = ""
        Salary.find({}).exec(function(err, SalaryRecords) {
            if (err) {
                console.log('Error while obtaining record Salary=',err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(SalaryRecords));
                result = SalaryRecords;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start sal delete");
        logger.info('Input id =' + id);
        var result = "";
        Salary.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record sal with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('sal record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Salary = mongoose.model('salary', salarySchema);
module.exports = Salary;
module.exports.methods = methods;