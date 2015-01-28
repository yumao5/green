var geoip = require('geoip-lite');

var utpInfo = function (info,id,ip,state) {

	this.data = {

		name: null,
		ip : null,
		referer: null,
		state : null,
	};

	this.name = id;
	this.ip = ip;
	this.referer = info.referer;	
	this.state = state;

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};
};

module.exports = function (info,id,ip,state) {
	//var geo = geoip.lookup(ip); 
	var geo = geoip.lookup('91.207.6.150');// Test ip 
	state = geo.country;
	var instance = new utpInfo(info,id,ip,state);
	instance.fill(info,id,ip,state);
	return instance;
};