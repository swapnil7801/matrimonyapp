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
    let city = require(contextPath + '/models/common/city.js');
    let color = require(contextPath + '/models/common/color.js');
    let country = require(contextPath + '/models/common/country.js');
    let gotra = require(contextPath + '/models/common/gotra.js');
    let height = require(contextPath + '/models/common/height.js');
    let occupation = require(contextPath + '/models/common/occupation.js');
    let salary = require(contextPath + '/models/common/salaryRange.js');
    let state = require(contextPath + '/models/common/state.js');
    let weight = require(contextPath + '/models/common/weight.js');
    let async = require('async');

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
        city: {
            type: Schema.Types.ObjectId,
            ref: 'city'
        },
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
        color: {
            type: Schema.Types.ObjectId,
            ref: 'color'
        },
        height: {
            type: Schema.Types.ObjectId,
            ref: 'height'
        },
        caste: {
            type: Schema.Types.ObjectId,
            ref: 'caste'
        },
        gotra: {
            type: Schema.Types.ObjectId,
            ref: 'gotra'
        },
        education: {
            type: Schema.Types.ObjectId,
            ref: 'education'
        },
        occupation: {
            type: Schema.Types.ObjectId,
            ref: 'occupation'
        },
        salaryRange: {
            type: Schema.Types.ObjectId,
            ref: 'salary'
        },
        weight: {
            type: Schema.Types.ObjectId,
            ref: 'weight'
        },
        education: {
            type: Schema.Types.ObjectId,
            ref: 'education'
        },
        country: {
            type: Schema.Types.ObjectId,
            ref: 'country'
        },
        state: {
            type: Schema.Types.ObjectId,
            ref: 'state'
        },
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
        getAll: function(offset, callback) {
            logger.info('Start: User getAll->', offset);
            var result = {};
            if (!offset || offset == '') {
                console.log('Invalid or no input offset');
                callback(err, result);
            }
            async.series([function(done) {
                    // logger.info('Start: User getAll->', offset);
                    // var result = {};
                    User.find({
                        role: 'user'
                    }).
                    limit(2)
                        .skip(parseInt(offset))
                        .exec(function(err, userRecord) {
                            if (err) {
                                console.log('Error while obtaining record user with ID=' + ' ' + err);
                                callback(err, result);
                            } else {
                                // console.log('Result:' + JSON.stringify(userRecord));
                                result.records = userRecord;
                                // result.total = userRecord.length;
                                // callback(err, result);
                                done();
                            }
                        });
                },
                function(done) {
                    User.find({role: 'user'})
                    .exec(function(err, userRecord) {
                            if (err) {
                                console.log('Error while obtaining record user with ID=' + ' ' + err);
                                callback(err, result);
                            } else {
                                // console.log('Result:' + JSON.stringify(userRecord));
                                // result.records = userRecord;
                                result.total = userRecord.length;
                                // callback(err, result);
                                done();
                            }
                        });
                }
            ], function(err) {
                if(err){
                callback(err, null);

                }else{
                    callback(null,result);
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
                .populate({
                    path: 'city',
                    select: 'name -_id'
                })
                .populate({
                    path: 'caste',
                    select: 'name -_id'
                })
                .populate({
                    path: 'color',
                    select: 'name -_id'
                })
                .populate({
                    path: 'country',
                    select: 'name -_id'
                })
                .populate({
                    path: 'education',
                    select: 'name -_id'
                })
                .populate({
                    path: 'occupation',
                    select: 'name -_id'
                })
                .populate({
                    path: 'gotra',
                    select: 'name -_id'
                })
                .populate({
                    path: 'height',
                    select: 'name -_id'
                })
                .populate({
                    path: 'state',
                    select: 'name -_id'
                })
                .populate({
                    path: 'salaryRange',
                    select: 'name -_id'
                })
                .populate({
                    path: 'weight',
                    select: 'name -_id'
                })
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