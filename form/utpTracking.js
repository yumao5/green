/******************************************************************************
 *
 * NAME
 *   utpTracking.js
 *
 * DESCRIPTION
 *   Insert data to test mysql database columns.
 *
 *	 When App collect visitor http request info and submit to this
 * 	 funcation, it insert to database. 
 *  
 *****************************************************************************///

var mysql = require('mysql');

function utpTracking (data) {

	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	  database : 'utc'
	});

	connection.connect();
	// Test mysql Database schema : ID, NAME, DATE, LOCATION, Date
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