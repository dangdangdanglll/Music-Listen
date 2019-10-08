const path = require('path');

module.exports = {
	viewDir:path.resolve('./views'),
	uploadDir: path.resolve('./public/files'),
	staticDir: path.resolve('./public'),
	appPort: 8888,
	dbConfig:{
 	 	connectionLimit : 10,
 	 	host            : 'localhost',
 	 	user            : 'root',
 	 	port            : '3306',
 	 	password        : '123456',
 	 	database        : 'test1'
	}

}