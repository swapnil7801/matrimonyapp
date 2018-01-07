
var db_name = 'matrimonydb';

var mongodb_url = 'mongodb://localhost:27017/'+db_name;

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
// 	};

var appconfig = {
	db_url: mongodb_url,
	app_env:"prod"
	};

module.exports = appconfig;





