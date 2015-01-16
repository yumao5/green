var express = require('express');
var path = require('path');
var colors = require('colors');

var app = express();

var server = app.listen(3000, function() {
	var host = server.address().address;
  	var port = server.address().port;	
	console.log(colors.yellow('Dev LendGreen Listening on port %d'), port)
});

//console.log(xw.toString());

// Parser xml
var parseString = require('xml2js').parseString;
var xml = "<CUSTOMER><PERSONAL><OTHEROFFERS>true</OTHEROFFERS>" +
		  "<EMAIL>Shaq.xxxxxxx@gmail.com</EMAIL></PERSONAL>" + 
		  "<BANK><ROUTINGNUMBER>051400549</ROUTINGNUMBER></BANK></CUSTOMER>";

parseString(xml, function (err, result) {
  //console.log(result.CUSTOMER.BANK);
});


var b = 0;
var a = b || 10;

console.log('result',typeof a , a );

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	  res.render('index'); 
});

app.post('/epic', function(req) {

    var form = require('./form/greenform')(req.data);         
    var formVa = require('./form/greenform_va');
    error = formVa.formValidate(form);        

    console.log(error);

    var formXml = '';
    var formXmlwriter = require('./form/greenXmlwirter');
    formXml =  formXmlwriter.xmlWriter(form);  

    console.log(formXml);    

    var postRequest = {
      host: "nstf.epicloansystems.com",
      path: "/service/leadinbox.ashx",      
      port: '443',
      method: "POST",
      headers: {          
          'Content-Type': 'text',
          'Content-Length': Buffer.byteLength(formXml)
      }
  	};

  	var buffer = "";

  	var req = http.request( postRequest, function( res )    {

    console.log( res.statusCode );
    var buffer = "";
    res.setEncoding('utf8');
    res.on( "data", function( data ) { buffer = buffer + data; } );
    res.on( "end", function( data ) { console.log( buffer ); } );     

  	});  

  	req.write( formXml );
	req.end();

});

app.get('/how', function (req, res) {
	  res.render('how'); 
});

app.get('/apply', function (req, res) {
	  res.render('apply'); 
});

app.get('/faq', function (req, res) {
	  res.render('faq'); 
});

app.get('/rates', function (req, res) {
	  res.render('rates'); 
});

app.get('/terms', function (req, res) {
	  res.render('terms'); 
});

app.get('/contact', function (req, res) {
	  res.render('contact'); 
});