/**
 * Created by swankhade on 26/10/15.
 * Model: User
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/utils/logger.js'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var caste = require(contextPath + '/models/common/caste.js');
var education = require(contextPath + '/models/common/education.js');

var userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    otp: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: {
        type: String
    },
    role: String,
    dob: Date,
    age: {
        type: Number
    },
    mobileno: {
        type: Number,
        unique: true
    },
    city: String,
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        default: 'MALE'
    },
    registrationdate: {
        type: Date,
        default: Date.now
    },
    birthPlace: String,
    color: String,
    height: String,
    cast: {
        type: Schema.Types.ObjectId,
        ref: 'caste'
    },
    gotra: String,
    education: {
        type: Schema.Types.ObjectId,
        ref: 'education'
    },
    occupation: String,
    salaryRange: Number,
    aboutMe: String
});
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);
var methods = {
    create: function(userInput, callback) {
        logger.info('Start: User create');
        logger.info('userInput =' + JSON.stringify(userInput));
        var result = "";
        var userData = userInput;
        User.create(userData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to User:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data.id;
                callback(err, result);
            }
        })
    },
    update: function(id, userInput, callback) {
        logger.info('Start: User create');
        logger.info('Input id =' + id);
        logger.info('userInput =' + JSON.stringify(userInput));
        var result = "";
        var userData = userInput;
        User.findByIdAndUpdate(id, userData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to User:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data._id;
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: User getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        User.findOne({
            _id: id
        }).exec(function(err, userRecord) {
            if (err) {
                console.log('Error while obtaining record user with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(userRecord));
                result = userRecord;
                callback(err, result);
            }
        });
    },
    getDetailById: function(id, callback) {
        logger.info('Start: User getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id == '') {
            console.log('Invalid or no input id');
            callback(err, result);
        }
        User.findOne({
                _id: id
            })
            .populate({ path: 'cast', select: 'name -_id' })
            .populate({ path: 'education',select: 'name -_id' })
            .exec(function(err, userRecord) {
                if (err) {
                    console.log('Error while obtaining record user with ID=' + id + ' ' + err);
                    callback(err, result);
                } else {
                    console.log('Result:' + JSON.stringify(userRecord));
                    result = userRecord;
                    callback(err, result);
                }
            });
    },
    getByEmail: function(email, callback) {
        logger.info('Start: User getByEmail');
        logger.info('Input email =' + email);
        var result = "";
        if (!email || email.trim() === '') {
            console.log('Invalid or no input email');
            callback(err, result);
        }
        User.findOne({
            email: email
        }).exec(function(err, userRecord) {
            if (err) {
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(userRecord));
                result = userRecord;
                callback(err, result);
            }
        });
    },
    getByMobile: function(mobileno, callback) {
        logger.info('Start: User getByMobile');
        logger.info('Input mobileno =' + mobileno);
        var result = "";
        if (!mobileno || mobileno.trim() === '') {
            console.log('Invalid or no input mobileno');
            callback(err, result);
        }
        User.findOne({
            mobileno: mobileno
        }).exec(function(err, userRecord) {
            if (err) {
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(userRecord));
                result = userRecord;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start User delete");
        logger.info('Input id =' + id);
        var result = "";
        User.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record user with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('User record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var User = mongoose.model('user', userSchema);
module.exports = User;
module.exports.methods = methods;