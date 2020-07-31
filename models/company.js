const mongoose = require('mongoose')

const companySchema = mongoose.Schema ({
    name: String,
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;