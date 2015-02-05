/******************************************************************************
 *
 * NAME
 *   greenXmlwriter.js
 *
 * DESCRIPTION
 *   Construct test XML data. 
 *  
 *****************************************************************************///

var XMLWriter = require('xml-writer');

function xmlWriter (data) {

	xw = new XMLWriter;
	xw.startDocument();

	var error = '';
	
	xw.startElement('REQUEST','');

		xw.startElement('REFERRAL','');
			xw.writeElement('STOREKEY','NSTF2');
			xw.writeElement('REFURL','nstf.epicloansystems.com');
		xw.endElement();

		xw.startElement('CUSTOMER','');
			xw.startElement('PERSONAL','');
				xw.writeElement('REQUESTEDAMOUNT','400');
			xw.endElement();

			xw.startElement('EMPLOYMENT','');
				xw.writeElement('INCOMETYPE','E');
			xw.endElement();

			xw.startElement('BANK','');
				xw.writeElement('ROUTINGNUMBER','051400549');
			xw.endElement();
		xw.endDocument();				  

	xw.endDocument();		

	return xw;

};

module.exports.xmlWriter = xmlWriter;