/******************************************************************************
 *
 * NAME
 *   greenform.js
 *
 * DESCRIPTION
 *   Construct test form submit data as object for furthere parser. 
 *  
 *****************************************************************************///


var Form = function (info) {
	this.data = {
		
		// Personal Information
		loanAmount: null,
		emailAddress : null,
		firstName: null,
		lastName: null,
		dateofBirth: null,
		socialNumber: null,
		address: null,
		city: null,
		state: null,
		zipCode: null,
		homePhone: null,
		otherPhone: null,
		driverState: null,
		driverNo: null,
		rentorOwn: null,
		durationatAddress: null,
		
		// Income Information
		incomeType: null,
		paymentType: null,
		ifMilitary: null,
		employerName: null,
		employerAddress: null,
		employerCity: null,
		employerState: null,
		employerZip: null,
		employerPhone: null,
		dateofHire: null,
		employmentType: null,
		jobTitle: null,
		payschedule: null,
		amountofLastPaycheck: null,
		customerMostRecentPayDate: null,
		customerNextPayDate: null,
		customerSecondPayDateaftertheLoan: null,

		// Banking Information
		bankName: null,
		routingABANumber: null,
		accountNumber: null,
		typeofAccount: null,
		lengthatBank: null,

		// Terms of Use
		ifAgree: null,
	};

	// Personal Information
	this.loanAmount = info.loanAmount;
	this.emailAddress = info.emailAddress;
	this.firstName = info.firstName;
	this.lastName = info.lastName;
	this.dateofBirth = info.dateofBirth;
	this.socialNumber = info.socialNumber;
	this.address = info.address;
	this.city = info.city;
	this.state = info.state;
	this.zipCode = info.zipCode;
	this.homePhone = info.homePhone;
	this.otherPhone = info.otherPhone;
	this.driverState = info.driverState;
	this.driverNo = info.driverNo;
	this.rentorOwn = info.rentorOwn;
	this.durationatAddress = info.durationatAddress;
	// Income Information
	this.incomeType = info.incomeType;
	this.paymentType = info.paymentType;
	this.ifMilitary = info.ifMilitary;
	this.employerName = info.employerName;
	this.employerAddress = info.employerAddress;
	this.employerCity = info.employerCity;
	this.employerState = info.employerState;
	this.employerZip = info.employerZip;
	this.employerPhone = info.employerPhone;
	this.dateofHire = info.dateofHire;
	this.employmentType = info.employmentType;
	this.jobTitle = info.jobTitle;
	this.paySchedule = info.paySchedule;
	this.amountofLastPaycheck = info.amountofLastPaycheck;
	this.customerMostRecentPayDate = info.customerMostRecentPayDate;
	this.customerNextPayDate = info.customerNextPayDate;
	this.customerSecondPayDateaftertheLoan = info.customerSecondPayDateaftertheLoan;
	// Banking Information
	this.bankName = info.bankName;
	this.routingABANumber = info.routingABANumber;
	this.accountNumber = info.accountNumber;
	this.typeofAccount = info.typeofAccount;
	this.lengthatBank = info.lengthatBank;

	// Terms of Use
	this.ifAgree = info.ifAgree

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};
};

module.exports = function (info) {
	var instance = new Form(info);
	instance.fill(info);
	return instance;
};