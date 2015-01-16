var va = require('validator');

function formValidate (form2) {     

        // Form items Validation
        var error = '';

        // Personal information && Contact information           
        if (va.isNull(form2.fundType) || !va.isAlpha(form2.fundType))
        { error = error + '- Fund type invalid'};

        if (va.isNull(form2.driLicense) || !va.isLength(form2.driLicense, 5, 15)) 
        { error = error + '- Driver License invalid' };

        if (!va.isAlpha(form2.isMilitary)) 
        { error = error + '- Military invalid' }; 

        if (va.isNull(form2.formatted_address))
        { error = error + '- Address invalid' };

        if (va.isNull(form2.postal_code)) 
        { error = error + '- Post Code invalid' };

        if (!va.isAlpha(form2.locality)) 
        { error = error + '- City invalid' };             

        if (!va.isAlpha(form2.administrative_area_level_1)) 
        { error = error + '- State invalid' }; 

        if (va.isNull(form2.mailed_formatted_address))
        { error = error + '- Address invalid' };

        if (va.isNull(form2.mailed_postal_code)) 
        { error = error + '- Post Code invalid' };

        if (!va.isAlpha(form2.mailed_locality)) 
        { error = error + '- City invalid' };             

        if (!va.isAlpha(form2.mailed_administrative_area_level_1)) 
        { error = error + '- State invalid' }; 


        //Employment Info
        if (!va.isFloat(form2.totalIncome))
        { error = error + '- Total Income invalid'}; 

        if (va.isNull(form2.incomeType) || !va.isAlpha(form2.incomeType))
        { error = error + '- Income Type invalid'}; 

        if (va.isNull(form2.payrollType) || !va.isAlpha(form2.payrollType))
        { error = error + '- Pay Roll Type invalid'};         

        if (va.isNull(form2.holidaySkip) || !va.isAlpha(form2.holidaySkip))
        { error = error + '- Pay Holiday Skip Type invalid'}; 

        if (va.isNull(form2.pfren) || !va.isAlpha(form2.pfren))
        { error = error + '- Pay Frequency invalid'};     

        if (va.isNull(form2.employerName) || !va.isAlpha(form2.employerName) || !va.isLength(form2.employerName, 2, 50))
        { error = error + '- Employer Name invalid '}; 

        if (va.isNull(form2.occupation) || !va.isAlpha(form2.occupation) || !va.isLength(form2.occupation, 1, 30))
        { error = error + '- Occupation invalid '}; 

        if (va.isNull(form2.workAddress))
        { error = error + '- Address invalid' };

        if (va.isNull(form2.workZip)) 
        { error = error + '- Post Code invalid' };

        if (!va.isAlpha(form2.workCity)) 
        { error = error + '- City invalid' };             

        if (!va.isAlpha(form2.workState)) 
        { error = error + '- State invalid' };     

        if (!va.isNumeric(va.blacklist(form2.wPhone,'-')) || !va.isLength(form2.wPhone, 12, 15 ))
        { error = error + '- Work Phone invalid'};  

        if (!va.isLength(form2.wPhoneext, 1 , 8))
        { error = error + '- Work Ext invalid '}; 

        if (!va.isNumeric(va.blacklist(form2.wPhonec,'-')) || !va.isLength(form2.wPhonec, 12, 15))
        { error = error + '- Work Cell Phone invalid'};  

        //Bank Info
        if (va.isNull(form2.bankName) || !va.isLength(form2.bankName, 2, 50))
        { error = error + '- Bank Name invalid '}; 

        if (va.isNull(form2.bankCity) || !va.isAlpha(form2.bankCity) || !va.isLength(form2.bankCity, 2, 50)) 
        { error = error + '- Bank City invalid' };          

        if (va.isNull(form2.bankState) || !va.isAlpha(form2.bankState) || !va.isLength(form2.bankState, 2, 10)) 
        { error = error + '- Bank State invalid' };

        if (va.isNull(form2.monthwithAccount) || !va.isNumeric(form2.monthwithAccount)) 
        { error = error + '- Months With Account invalid' };               

        if (va.isNull(form2.accountNumber) || !va.isNumeric(form2.accountNumber) || !va.isLength(form2.accountNumber, 4, 17)) 
        { error = error + '- Bank Account Number invalid' };

        if (va.isNull(form2.accountType) || !va.isAlpha(form2.accountType)) 
        { error = error + '- Bank Account Type invalid' };

        var vRnumber = require('./validRoutingNumber'); 
        if ( va.isNull(form2.abaNumber) || va.trim(vRnumber.validRoutingNumber(form2.abaNumber)) === 'false') 
        { error = error + '- Bank Routing transit number invalid '};
        //error = error + '- Bank Routing transit number is ' + vRnumber.validRoutingNumber(form2.abaNumber);
        console.log(vRnumber.validRoutingNumber(form2.abaNumber));

        return error;
};

module.exports.formValidate = formValidate;