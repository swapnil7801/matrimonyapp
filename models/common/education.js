/**
 * Created by swankhade on 26/10/15.
 * Model: education
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var educationSchema = mongoose.Schema({
     name: String
   
});
// Apply the uniqueValidator plugin to educationSchema.
educationSchema.plugin(uniqueValidator);
var methods = {
    create: function(educationInput, callback) {
        logger.info('Start: education create');
        logger.info('educationInput =' + JSON.stringify(educationInput));
        var result = "";
        var educationData = educationInput;
        Education.create(educationData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to education:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, educationInput, callback) {
        logger.info('Start: education create');
        logger.info('Input id =' + id);
        logger.info('educationInput =' + JSON.stringify(educationInput));
        var result = "";
        var educationData = educationInput;
        Education.findByIdAndUpdate(id, educationData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to education:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: education getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        Education.findOne({
            _id: id
        }).exec(function(err, educationRecord) {
            if (err) {
                console.log('Error while obtaining record education with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(educationRecord));
                result = educationRecord;
                callback(err, result);
            }
        });
    },
     getAll: function(callback) {
        logger.info('Start: education getAll');
        var result = "";
       
        Education.find({}).exec(function(err, educationRecord) {
            if (err) {
                console.log('Error while obtaining record education with ID=', err);
                callback(err,null);
            } else {
                console.log('Result:' + JSON.stringify(educationRecord));
                result = educationRecord;
                callback(err, result);
            }
        });
    },
    getByEmail: function(email, callback) {
        logger.info('Start: education getByEmail');
        logger.info('Input email =' + email);
        var result = "";
        if (!email || email.trim() === '') {
            console.log('Invalid or no input email');
            callback(err, result);
        }
        Education.findOne({
            email: email
        }).exec(function(err, educationRecord) {
            if (err) {
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(educationRecord));
                result = educationRecord;
                callback(err, result);
            }
        });
    },
    getByMobile: function(mobileno, callback) {
        logger.info('Start: education getByMobile');
        logger.info('Input mobileno =' + mobileno);
        var result = "";
        if (!mobileno || mobileno.trim() === '') {
            console.log('Invalid or no input mobileno');
            callback(err, result);
        }
        Education.findOne({
            mobileno: mobileno
        }).exec(function(err, educationRecord) {
            if (err) {
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(educationRecord));
                result = educationRecord;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start education delete");
        logger.info('Input id =' + id);
        var result = "";
        Education.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record education with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('education record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Education = mongoose.model('education', educationSchema);
module.exports = Education;
module.exports.methods = methods;