const Company = require('../models').Company


const createCompany = (req, res) => {
   Company.create(req.body, (err, createdCompany)=> {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(200).json(createdCompany)
    });
}
const showCompany = (req,res) => {
    Company.findbyId(req.params.id)
    .populate('employee')
    .exec((err, foundCompany) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(200).json(foundCompany)
    })

}
const showAllCompanies = (req, res) => {
    Company.find({}, (err, foundAllCompanies) => {

        if(err) {
            return res.status(500).json(err);
        }
        res.status(200).json(foundAllCompanies);
    })
}
const deleteCompany = (req,res) => {
    Company.findByIdAndRemove(req.params.id, (err, deleteCompany)=> {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(deleteCompany);
    })
}


// const addEmployeeToCompany = (req, res => {
//     Company.findById(req.body.companyId, (err, foundCompany)=> {
//         if(err) {
//             return res.status(500).json(err);
//         }
//         foundCompany.employees.push(req.body.employeeId);
//         Employee.findById(req.body.employeeId, (err, foundEmployee)=> {
//             if(err) {
//                 return res.status(500).json(err);
//             }
//             foundCompany.employees.push(foundEmployee);

//             foundCompany.save((err, savedCompany) => {
//                 if(err) {
//                     return res.status(500).json(err);
//                 }
//                 res.status(200).jspm(savedCompany)
//             })
//         })
//     })
// })

const editCompany = (req,res) => {
    Company.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedCompany) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(updatedCompany);
    })
}

module.exports = {
    createCompany,
    showCompany,
    showAllCompanies,
    deleteCompany,
    editCompany,
    // addEmployeeToCompany
}