const mongoose = require('mongoose');

const employeeSchema= mongoose.Schema({
        username: String,
        password: String,
        name: String,


});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports= Employee;

