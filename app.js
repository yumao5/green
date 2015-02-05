/******************************************************************************
 *
 * NAME
 *   app.js
 *
 * DESCRIPTION
 *   Create node web server with port 3000. 
 *
 *   Included funcation routes info, session control, vistor tracking, Epic web 
 *   service interaction
 *    
 *   Update file's contents based on Socket.io within route 'CMS'
 *
 *****************************************************************************///

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
//Color console info with different settings
var colors = require('colors');
var http = require('https');
var MongoStore = require('connect-mongo')(session);
var fs = require('fs');
//Recursive file operations
var wrench = require("wrench");


var app = express();
var server = app.listen(3000, function() {
	var host = server.address().address;
  	var port = server.address().port;	
	console.log(colors.yellow('Dev LendGreen Listening on port %d'), port)
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(session({
    secret: 'kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig',              
    key: 'sid', 
    resave: false,
    saveUninitialized: true,        
    store:new MongoStore({
            db: 'session-test',            
            host: '127.0.0.1',
            port: 27017,  
            username: '',
            password: '', 
            collection: 'session', 
            autoReconnect:true,
            // Auto remove expired session after 20 mins
            autoRemove: 'interval', 
            autoRemoveInterval: 20            
    }),
    cookie: { path: '/', httpOnly: true, maxAge : 360000000000}, // 10 years    
  })    
);

// Utp checking function, check request header info and request ip info, 
// and then insert info to database 
function visitorRoutecheck(req, res, next){  
    
  var utpInfo = require('./form/utpInfo')(req.headers,req.sessionID,req.ip);     
  var utp = require('./form/utpTracking');
  var error =  utp.utpTracking(utpInfo);
  //console.log(colors.red('Utp tracking data function error :',error));
  next();
}

app.all('*', visitorRoutecheck); // Show info

app.get('/', function (req, res) {
    res.render('index');    
});

app.get('/epic', function(req) {

	  // Construct xml based on application
    var formXml = '';
    var formXmlwriter = require('./form/greenXmlwriter');
    formXml =  formXmlwriter.xmlWriter(form);  

    //Test data
    // formXml = '<?xml version="1.0" encoding="utf-8"?> <REQUEST> <REFERRAL> <STOREKEY>NSTF2</STOREKEY> <REFURL>https://nstf.epicloansystems.com/service/leadinbox.ashx</REFURL> <IPADDRESS>173.209.212.155</IPADDRESS> <TIERKEY>OTTP71CBGAI3TSXRVT66LKRCWDRPRAP1OQV0J2156C2HW4CPOPKQ1G242GRS7LH6</TIERKEY> <AFFID/> <SUBID/> <TEST>true</TEST> </REFERRAL> <CUSTOMER> <PERSONAL> <REQUESTEDAMOUNT>400</REQUESTEDAMOUNT> <SSN>000000000</SSN> <DOB>1965-09-26</DOB> <FIRSTNAME>Lisa</FIRSTNAME> <MIDDLEINITIAL/> <LASTNAME>Brown</LASTNAME> <ADDRESS>359 Farmview rd</ADDRESS> <ADDRESS2/> <CITY>Farmville</CITY> <STATE>VA</STATE> <ZIP>23901</ZIP> <HOMEPHONE>(434)390-8931</HOMEPHONE> <OTHERPHONE>(434)414-5820</OTHERPHONE> <DLSTATE>VA</DLSTATE> <DLNUMBER>T67530000</DLNUMBER> <CONTACTTIME/> <ADDRESSMONTHS>10</ADDRESSMONTHS> <ADDRESSYEARS>3</ADDRESSYEARS> <RENTOROWN>R</RENTOROWN> <ISMILITARY>false</ISMILITARY> <ISCITIZEN>true</ISCITIZEN> <OTHEROFFERS>true</OTHEROFFERS> <EMAIL>Shaq.xxxxxxx@gmail.com</EMAIL> </PERSONAL> <EMPLOYMENT> <INCOMETYPE>E</INCOMETYPE> <PAYTYPE>D</PAYTYPE> <EMPMONTHS>4</EMPMONTHS> <EMPYEARS>18</EMPYEARS> <EMPNAME>Piedmont Geriatric Hospital</EMPNAME> <EMPADDRESS>5001 E. Patrick Henry Highway.</EMPADDRESS> <EMPADDRESS2>P.O. Box 427</EMPADDRESS2> <EMPCITY>Burkeville</EMPCITY> <EMPSTATE>VA</EMPSTATE> <EMPZIP>23922</EMPZIP> <EMPPHONE>(434)767-4492</EMPPHONE> <EMPPHONEEXT/> <SUPERVISORNAME>Mitzi Thackston</SUPERVISORNAME> <HIREDATE>1995-11-16</HIREDATE> <EMPTYPE>F</EMPTYPE> <JOBTITLE>Nursing aid</JOBTITLE> <PAYFREQUENCY>B</PAYFREQUENCY> <NETMONTHLY>1800</NETMONTHLY> <LASTPAYDATE>2014-09-16</LASTPAYDATE> <NEXTPAYDATE>2014-10-01</NEXTPAYDATE> <SECONDPAYDATE>2014-10-16</SECONDPAYDATE> </EMPLOYMENT> <BANK> <BANKNAME>Wells Fargo</BANKNAME> <ACCOUNTTYPE>C</ACCOUNTTYPE> <ROUTINGNUMBER>051400549</ROUTINGNUMBER> <ACCOUNTNUMBER>1984424992</ACCOUNTNUMBER> <BANKMONTHS>3</BANKMONTHS> <BANKYEARS>4</BANKYEARS> </BANK> <REFERENCES> <REFERENCE> <FIRSTNAME>John</FIRSTNAME> <LASTNAME>Smith</LASTNAME> <PHONE>(111)222-3333</PHONE> <RELATIONSHIP>F</RELATIONSHIP> </REFERENCE> <REFERENCE> <FIRSTNAME>Jim</FIRSTNAME> <LASTNAME>Jones</LASTNAME> <PHONE>(333)222-1111</PHONE> <RELATIONSHIP>F</RELATIONSHIP> </REFERENCE> </REFERENCES> </CUSTOMER> </REQUEST>'; 
    //console.log(formXml);    

    // Submit data to web serivce
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
    var xml = '';

  	var serivceReq = http.request( postRequest, function( res ){
	    console.log( 'Web service status code is', res.statusCode );
	    res.setEncoding('utf8');
	    res.on( "data", function( data ) { buffer = buffer + data } );
	    res.on( "end", function( data ) { 
        // Collect result and Parser xml
        xml = buffer; 
        var parseString = require('xml2js').parseString; 
        parseString(xml, {trim: true}, function (err, result) {
          console.log(result.Response.Result);
        });
      } );     
  	});  

  	serivceReq.write( formXml );
	  serivceReq.end();

    //Test submmit data
    //var xml = serivceReq;
    //console.log(xml);
  
    //var parseString = require('xml2js').parseString;
    // var xml = '<?xml version="1.0" encoding="utf-8"?><Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Result>R</Result><RejectionReason>Test == true</RejectionReason></Response>';    

    // parseString(xml, {trim: true}, function (err, result) {
    //    console.log(result.Response.RejectionReason);
    // });

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


app.get('/cms', function (req, res) {

  // Read test file 
  pData = fs.readFileSync(path.resolve(__dirname, 'public/p1.html'), 'utf8');    
  
  var files = wrench.readdirSyncRecursive('public/pages/',0700);
  console.log(JSON.stringify(files));
  res.render('cms', {pageData : pData, pagelists : files});    
});

// use socket.io to modify file content
var io = require('socket.io')(server);

io.on('connection', function (socket,res) {
 socket.on('update', function (data) {    
    var tempString = '';
    var emptyString = '';
    var date = '';
    var time = '';

    date = new Date();
    time = date.getTime();

    //console.log(time);

    tempString = fs.readFileSync(path.resolve(__dirname, 'public/p1.html'), 'utf8');      
    fs.writeFileSync(path.resolve(__dirname, 'public/p1_' + time +'.html'), tempString); 

    // Test for backup file with ftp method
    // ftp.put(buffer, 'path/to/remote/file.txt', function(hadError) {
    //   if (!hadError)
    //     console.log("File transferred successfully!");
    // });

    // Clear test file
    fs.writeFileSync(path.resolve(__dirname, 'public/p1.html'), emptyString);    
    // Update test file
    fs.writeFileSync(path.resolve(__dirname, 'public/p1.html'), data.elements);
    
    socket.emit('done');

    // req.io.respond({
    //     success: req.data.elements
    // })
 });

});