const mongoose = require('mongoose');

const entrySchema= mongoose.Schema({
      title: String,
      body: String,
      employee: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employee'
    },
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company'
    }



});

const Entry= mongoose.model('Entry', entrySchema);

module.exports= Entry;

