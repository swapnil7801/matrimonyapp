    /**
     * Created by swankhade on 26/10/15.
     * Model: Favourite
     */

    var mongoose = require('mongoose'),
        contextPath = process.cwd(); // This is the context path of the application.
    // mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
    logger = require(contextPath + '/utils/logger.js'),
        Schema = mongoose.Schema;
    var uniqueValidator = require('mongoose-unique-validator');
    var user = require(contextPath + '/models/common/user.js');
    let async = require('async');

    var favSchema = mongoose.Schema({
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            unique: true
        },
        favUsers: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    });
    // Apply the uniqueValidator plugin to favSchema.
    favSchema.plugin(uniqueValidator);
    var methods = {
        create: function(userInput, callback) {
            logger.info('Start: favourite create');
            logger.info('Favourite =' + JSON.stringify(userInput));
            var result = "";
            var userData = userInput;
            Favourite.create(userData, function(err, data) {
                if (err) {
                    logger.error('err =' + err);
                    logger.error('Error while adding recored to Favourite:' + err);
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
            console.log('code1');
            logger.info('Start: Favourite create');
            logger.info('Input id =' + id);
            // logger.info('userInput =' + JSON.stringify(userInput));
            var result = "";
            // var userData = userInput;
            Favourite.findByIdAndUpdate(id, {
                "$addToSet": {
                    "favUsers": userInput
                }
            }, function(err, data) {
                if (err) {
                    logger.error('err =' + err);
                    logger.error('Error while updating recored to Favourite:' + err);
                    callback(err, result);
                } else {
                    logger.debug('Record updated succesfully:' + JSON.stringify(data));
                    result = data._id;
                    callback(err, result);
                }
            });
        },
        removefromFav: function(id, userInput, callback) {
            console.log('code1');
            logger.info('Start: removefromFav');
            logger.info('Input id =' + id);
            // logger.info('userInput =' + JSON.stringify(userInput));
            var result = "";
            // var userData = userInput;
            Favourite.findByIdAndUpdate(id, {
                "$pull": {
                    "favUsers": userInput
                }
            }, function(err, data) {
                if (err) {
                    logger.error('err =' + err);
                    logger.error('Error while updating recored to removefromFav:' + err);
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
                callback('Invalid or no input id', result);
            }
            Favourite.findOne({
                user_id: id
            }).populate({
                path: 'city',
                select: 'name -_id'
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
        getShortListedById: function(id, callback) {
            logger.info('Start: User getShortListedById');
            logger.info('Input id =' + id);
            var result = ""
            if (!id || id == '') {
                console.log('Invalid or no input id');
                callback('Invalid or no input id', result);
            }
            Favourite.findOne({
                user_id: id
            }).populate({
                    path: 'favUsers',
                    select: 'firstname lastname email aboutMe gender city '
                }).populate({
                path: 'user_id',
                select: 'firstname lastname email aboutMe gender city'
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
        delete: function(id, callback) {
            logger.info("Start Favourite delete");
            logger.info('Input id =' + id);
            var result = "";
            Favourite.findByIdAndRemove(id, function(err) {
                if (err) {
                    console.log('Error while deleting record Favourite with id =' + id + ' ' + err);
                    callback(err, result);
                } else {
                    console.log('Favourite record deleted succesfully.');
                    callback(err, result);
                }
            });
        }
    }
    var Favourite = mongoose.model('favourite', favSchema);
    module.exports = Favourite;
    module.exports.methods = methods;