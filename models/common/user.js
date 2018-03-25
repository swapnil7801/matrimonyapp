    /**
     * Created by swankhade on 26/10/15.
     * Model: User
     */

    var mongoose = require('mongoose'),
        _ = require('underscore'),
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

    mongoose.set('debug', true);
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
        aboutMe: String,
        martialStatus: String,
        birthTime: String,
        aadharCard: String,
        panCard: String,
        physicallyDisabled: String,
        zodiacSign: String,
        companyName: String,
        profile:String

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
            logger.info('Start: User update');
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
                    limit(5)
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
                    User.find({
                            role: 'user'
                        })
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
                if (err) {
                    callback(err, null);

                } else {
                    callback(null, result);
                }

            });



        },
        getAllUserAdmin: function(callback) {
            logger.info('Start: User getAllUserAdmin->');
            var result = {};
            async.series([function(done) {
                    // logger.info('Start: User getAll->', offset);
                    // var result = {};
                    User.find({
                            role: 'user'
                        })
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
                    User.find({
                            role: 'user'
                        })
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
                if (err) {
                    callback(err, null);

                } else {
                    callback(null, result);
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
                    select: 'name '
                })
                .populate({
                    path: 'caste',
                    select: 'name '
                })
                .populate({
                    path: 'color',
                    select: 'name '
                })
                .populate({
                    path: 'country',
                    select: 'name '
                })
                .populate({
                    path: 'education',
                    select: 'name '
                })
                .populate({
                    path: 'occupation',
                    select: 'name '
                })
                .populate({
                    path: 'gotra',
                    select: 'name '
                })
                .populate({
                    path: 'height',
                    select: 'name '
                })
                .populate({
                    path: 'state',
                    select: 'name '
                })
                .populate({
                    path: 'salaryRange',
                    select: 'name '
                })
                .populate({
                    path: 'weight',
                    select: 'name '
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
        },
        getFilteredUser: function(queryData, callback) {
            logger.info('Start: User getFilteredUser->', queryData.offset);
            var result = {};
            var opResult = {};
            var filterResult = {};
            opResult.records = [];
            filterResult.records = [];
            if (!queryData.offset || queryData.offset == '') {
                console.log('Invalid or no input queryData.offset');
                callback(err, result);
            }
            let isSalaryPresent = false;
            let isHeightPresent = false;
            //////////////////
            var queryObj = {
                role: 'user',
                age: {
                    $gte: '',
                    $lte: ''
                }
            };
            var heightObj = {
                name: {
                    $gte: null,
                    $lte: null,
                    $ne: null
                }
            };
            var salaryObj = {
                name: {
                    $gte: null,
                    $lte: null,
                    $ne: null
                }
            };
            var salaryPopulate={
                        path: 'salaryRange',
                        match: salaryObj ,
                        select: 'name -_id'
                    }
            var heightPopulate={
                        path: 'height',
                        match: heightObj,
                        select: 'name -_id'
                    }
            //////////////////
          if ((queryData.minAge) && (queryData.maxAge)) {
                        queryObj.age.$gte = parseInt(queryData.minAge);
                        queryObj.age.$lte = parseInt(queryData.maxAge);
                        // isAgePresent=true;
                        // queryObj.age=ageObj;
                    } else {
                        delete queryObj.age;
                    }
                    if ((queryData.minHeight) && (queryData.maxHeight)) {
                        heightObj.name.$gte = parseInt(queryData.minHeight);
                        heightObj.name.$lte = parseInt(queryData.maxHeight);
                        isHeightPresent = true;
                        // queryObj.age=ageObj;
                    } else {
                        delete heightPopulate.match;
                        // _.omit(heightPopulate, "match");
                    }
                    if ((queryData.minSalary) && (queryData.maxSalary)) {
                        salaryObj.name.$gte = parseInt(queryData.minSalary);
                        salaryObj.name.$lte = parseInt(queryData.maxSalary);
                        isSalaryPresent = true;
                    }else{
                        delete salaryPopulate.match;
                        // _.omit(salaryPopulate, "match");
                        
                    }
            //////////////////
            async.series([function(done) {
                    // logger.info('Start: User getAll->', queryData.offset);

                    // var ageObj={$gte:'',$lte:''};
                    // console.log(ageObj);



                    console.log('salaryPopulate-',salaryPopulate);
                    User.find(
                        queryObj
                    ).
                    populate(salaryPopulate).populate(heightPopulate)
                    // .limit(2)
                    //     .skip(parseInt(queryData.offset))
                        .exec(function(err, userRecord) {
                            if (err) {
                                console.log('Error while obtaining record user with ID=' + ' ' + err);
                                callback(err, result);
                            } else {
                                result.records = userRecord;
                               console.log('Count is ' + result.records.length);
                               console.log('rec is ' + result.records);

                                done();
                            }
                        });
                },
                function(done) { //querry to get only total records

                    // userModel.count({name: 'anand'}, function(err, c) {
                    //    console.log('Count is ' + c);
                    //  });
                    done();
                    // User.count(
                    //     queryObj
                    // ).
                    // populate({
                    //         path: 'salaryRange',
                    //         match: salaryObj,
                    //         select: 'name -_id'
                    //     }).populate({
                    //         path: 'height',
                    //         match: heightObj,
                    //         select: 'name -_id'
                    //     })
                    //     .exec(function(err, count) {
                    //         if (err) {
                    //             console.log('Error while obtaining record user with ID=' + ' ' + err);
                    //             callback(err,null);
                    //         } else {
                    //             // result.records = userRecord;
                    //             filterResult.total = count;
                    //             done();
                    //         }
                    //     });
                },
                function(done) {
                    async.each(result.records, function(singeRecord, eachCallback) {

                        if (isHeightPresent) {
                            console.log("code1- isHeightPresent ",isHeightPresent);
                            if (singeRecord.height == null) {

                            } else {
                                opResult.records.push(singeRecord);
                            }
                        }
                        if (isSalaryPresent) {
                            console.log("code1- isSalaryPresent ",isSalaryPresent);

                            if (singeRecord.salaryRange == null) {

                            } else {
                                opResult.records.push(singeRecord);
                            }
                        }
                        process.nextTick(function() {
                            eachCallback();
                        })


                    }, function(err) {
                        if (err) {} else {
                            done();
                        }
                    });
                },
                function(done) {
                    ///filter any null value present 
                    if(isHeightPresent || isHeightPresent){
                        console.log("one/both filter applied");
                    }else{
                        opResult.records=result.records;
                    }

                    async.each(opResult.records, function(singeRecord, eachCallback1) {
                        if (singeRecord !== undefined) {
                            if (isHeightPresent) {
                                if (singeRecord.height == null) {
                                    console.log(' height delete...', singeRecord._id);
                                    opResult.records.splice(_.indexOf(opResult.records, _.findWhere(opResult.records, singeRecord)), 1);
                                }
                            }
                            if (isSalaryPresent) {
                                if (singeRecord.salaryRange == null) {
                                    console.log(' salaryRange delete...', singeRecord._id);
                                    opResult.records.splice(_.indexOf(opResult.records, _.findWhere(opResult.records, singeRecord)), 1);
                                }
                            }
                            if ((isSalaryPresent) && (isHeightPresent)) {
                                if ((singeRecord.salaryRange == null) || (singeRecord.height == null)) {
                                    console.log(' 3rdCondition delete...', singeRecord._id);
                                    opResult.records.splice(_.indexOf(opResult.records, _.findWhere(opResult.records, singeRecord)), 1);

                                }
                            }
                        }
                        process.nextTick(function() {
                            eachCallback1();
                        })
                    }, function(err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A record failed to process');
                        } else {
                            console.log('All records have been processed successfully');
                            done();
                        }
                    });
                },
                function(done) {
                    ///filter any null value present 
                    async.each(opResult.records, function(singleRecord, eachCallback1) {
                        // Perform operation on file here.
                        // eachCallback();
                        const removeEmpty = (obj) => {
                            Object.keys(obj).forEach(k =>
                                (obj[k] && typeof obj[k] === 'object') && removeEmpty(obj[k]) ||
                                (!obj[k] && obj[k] !== undefined) && delete obj[k]
                            );
                            return obj;
                        };
                        filterResult.records.push(removeEmpty(singleRecord));
                        process.nextTick(function() {
                            eachCallback1();
                        })
                    }, function(err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A record failed to process');
                        } else {
                            filterResult.total = filterResult.records.length;

                            console.log('All records have been processed successfully');
                            // console.log('opResult',opResult);
                            done();
                        }
                    });
                }

            ], function(err) {
                if (err) {
                    callback(err, null);

                } else {
                    callback(null, filterResult);
                }

            });



        }
    }

    var User = mongoose.model('user', userSchema);
    module.exports = User;
    module.exports.methods = methods;