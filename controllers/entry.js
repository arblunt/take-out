const Employee = require('../models').Employee
const Entry = require('../models').Entry
const Company = require('../models').Company

const createEntry = (req, res) => {
    if (!(req.body.employee && req.body.company)) {
        return res.status(500).send("Bad Request");
    }
    Employee.findById(req.body.employee, (err, foundEmployee) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!foundEmployee) {
            return res.status(500).send("Employee Not Found");
        }
    })
    Company.findById(req.body.company, (err, foundCompany) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!foundCompany) {
            return res.status(500).send("Company Not Found");
        }
    })
    Entry.create(req.body, (err, createEntry) => {
        if(err){
            return res.status(500).json(err);
        }

        res.status(200).json(createEntry);
    });
}

const showEntry = (req,res) => {
    Entry.findById(req.params.id)
    .populate('employee')
    .populate('company')
    .exec((err, foundEntry) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(200).json(foundEntry)
    })

}

const showAllEntries= (req, res) => {
    Entry.find({}, (err, foundAllEntries) => {

        if(err) {
            return res.status(500).json(err);
        }
       res.render('explore.ejs', {
           allentries: foundAllEntries})
    })
}

const deleteEntry= (req, res) => {
    Entry.findByIdAndRemove(req.params.id, (err, deleteEntry)=> {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(200).json(deleteEntry);
    });
}

const editEntry = (req, res) => {
    Entry.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedEntry) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(200).json(updatedEntry)
    });
}


module.exports = {
    createEntry,
    showEntry,
    showAllEntries,
    deleteEntry,
    editEntry


}