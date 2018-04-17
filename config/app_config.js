var db_name = 'matrimonydb';

var mongodb_url = 'mongodb://localhost:27017/' + db_name;

/*if(process.env.OPENSHIFT_MONGODB_DB_HOST){
	mongodb_url = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
							process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
							process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +  
							process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
							process.env.OPENSHIFT_APP_NAME;
}*/

// var appconfig = {
// 	node_app_ip: process.env.node_app_ip, // || process.env.OPENSHIFT_NODEJS_IP,
// 	node_app_port: process.env.node_app_port , // || process.env.OPENSHIFT_NODEJS_PORT ,
// 	db_url: mongodb_url, 
// 	node_app_use: process.env.node_app_use,
// 	db_port: process.env.db_port, //|| process.env.OPENSHIFT_MONGODB_DB_PORT,
// 	db_host:  process.env.db_host,// || process.env.OPENSHIFT_MONGODB_DB_HOST,
// 	db_name:  process.env.db_name,//  || process.env.OPENSHIFT_APP_NAME,
/// 	};


////CHANGE THE app_env to LOCAL in local ENV.
var twilio_accountSid = 'ACa0c8e551bbea3c89979229b4e55f58ad';
var twilio_authToken = '3b8ad5dd768229c743d988b69c5206b8';
var twilio_no = '+19166686363';
var appconfig = {
	db_url: mongodb_url,
	app_env: "prod",
	twilio_authToken: twilio_authToken,
	twilio_accountSid: twilio_accountSid,
	twilio_no: twilio_no,
	Cloudname: 'valorous',
	APIKey: '482565431328965',
	APISecret: 'bAX9v_gvLROdkrKMx1DmFHz6MyU',
	Environmentvariable: 'CLOUDINARY_URL=cloudinary://482565431328965:bAX9v_gvLROdkrKMx1DmFHz6MyU@valorous',
	BasedeliveryURL: 'http://res.cloudinary.com/valorous',
	SecuredeliveryURL: 'https://res.cloudinary.com/valorous',
	APIBaseURL: 'https://api.cloudinary.com/v1_1/valorous '
};

module.exports = appconfig;
