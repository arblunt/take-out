const mongoose = require('mongoose')

const companySchema = mongoose.Schema ({
    name: String,
    employees: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Employee'
    }]
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;