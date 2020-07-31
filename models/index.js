const mongoose = require('mongoose');
const Employee = require('./employee');
const Company = require('./company');
const Entry = require('./entry');

const connectionString = 'mongodb://localhost/takeout-app';

mongoose.connect(connectionString, {    useNewUrlParser: true,
                                        useUnifiedTopology: true,
                                        useCreateIndex: true,
                                        useFindAndModify: false
                                        });
                                        

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected'); 
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', (error) => {
    console.log(`Mongoose error: ${error}`);
});

exports.Employee = Employee;
exports.Company = Company;
exports.Entry = Entry; 
