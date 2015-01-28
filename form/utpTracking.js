var mysql = require('mysql');

function utpTracking (data) {

	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	  database : 'utc'
	});

	connection.connect();

	var post  = {  name: data.name, ip: data.ip, referer: data.referer, state: data.state  };

  	connection.query('INSERT INTO info SET ?', post, function(err, rows, fields) {
    	if (err) {
      		console.error('error connecting: ' + err.stack);
      		return err;
    	}    
  	});

	connection.end();
};

module.exports.utpTracking = utpTracking;