const Employee = require('../models').Employee
const Entry = require('../models').Entry
const Company = require('../models').Company

const renderNew = (req,res) => {
    Company.find({}, (err, foundAllCompanies) => {
        if(err){
           return res.status(500).json  
        } 
        res.render('new.ejs', {
            company: foundAllCompanies,
            employeeId: req.params.id
        })
    })
   
}

const createEntry = (req, res) => {
    console.log(req.params.id)
    if (!(req.params.id && req.body.company)) {
        return res.status(500).send("Bad Request");
    }
    Employee.findById(req.params.id, (err, foundEmployee) => {
        console.log(foundEmployee)
        if(err){
            return res.status(500).json(err);
        }
        if(!foundEmployee) {
            return res.status(500).send("Employee Not Found");
        }
        req.body.employee = foundEmployee._id
        Company.findById(req.body.company, (err, foundCompany) => {
            if(err){
                return res.status(500).json(err);
            }
            if(!foundCompany) {
                return res.status(500).send("Company Not Found");
            }
            console.log(req.body)
            Entry.create(req.body, (err, createEntry) => {
                if(err){
                    return res.status(500).json(err);
                }
        
                // res.status(200).json(createEntry);
                res.redirect(`/employee/${foundEmployee._id}`)
            });
        })
    })
    
   
}

const showEntry = (req,res) => {
    Entry.findById(req.params.id)
    .populate('employee')
    .populate('company')
    .exec((err, foundEntry) => {
        console.log(foundEntry)
        if(err) {
            return res.status(500).json(err);
        }
        res.render('show.ejs', {
            showentry: foundEntry})
     })

}


const showAllEntries= (req, res) => {
    Entry.find({}, (err, foundAllEntries) => {
        if(err){
           return res.status(500).json  
        }
       res.render('explore.ejs', {
           allentries: foundAllEntries
       })
    })

}


const deleteEntry= (req, res) => {
    Entry.findByIdAndRemove(req.params.id, (err, deleteEntry)=> {
            if(err) {
                return res.status(500).json(err);
            }
            res.redirect('/entries/all');
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
    renderNew,
    showEntry,
    showAllEntries,
    deleteEntry,
    editEntry


}