const Employee = require('../models').Employee;
const Entry = require('../models').Entry

const createEmployee = (req, res) => {
    Employee.create(req.body, (err, createdEmployee) => {
        if(err){
            return res.status(500).json(err);
        }
        Entry.find({"employee":req.params.id}, (err, foundEntryByEmployee) => {
            if(err) {
                return res.status(500).json(err);
            }
            res.render('profile.ejs', {
                employee: createdEmployee,
                entries: foundEntryByEmployee
            })
        })
    });
}

const renderSignUp = (req, res) => {
    res.render('signup.ejs')
}
const showEmployee = (req, res) => {
    Employee.findById(req.params.id, (err, foundEmployee) => {
        if(err) {
            return res.status(500).json(err);
        }
        Entry.find({"employee":req.params.id}, (err, foundEntryByEmployee) => {
            if(err) {
                return res.status(500).json(err);
            }
            res.render('profile.ejs', {
                employee: foundEmployee,
                entries: foundEntryByEmployee
            })
        })
        // res.status(200).json(foundEmployee);
     
    })
}

const renderLogin = (req, res) => {
    res.render('login.ejs')
}

const login = (req,res) => {
    Employee.findOne({
        username: req.body.username, 
        password: req.body.password
    }, (err, foundEmployee) => {
        if(err) {
            return res.status(500).json(err);
        }
        if(foundEmployee) {
        res.redirect(`/employee/${foundEmployee._id}`)
        } else {
            return res.status(404).json(err);
        }
    })
}

const showAllEmployees = (req,res) => {
    Employee.find({}, (err, foundEmployees) => {
        if(err) {
            return res.status(500).json(err);
        }

        res.status(200).json(foundEmployees)
    })
}

const deleteEmployee = (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, deleteEmployee)=> {
        if(err) {
            return res.status(500).json(err);
        }
        res.redirect('/')
    
    });
}

// const renderEdit = (req,res) => {
//     Employee.findOne({
//         name: req.body.name,
//         username: req.body.username, 
//         password: req.body.password
//     }, (err, updatedEmployee) => {
//         if(err) {
//             return res.status(500).json(err);
//         }
//         res.redirect(`/employee/${updatedEmployee._id}`)
//     })
// }



const editEmployee = (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedEmployee) => {
        console.log(updatedEmployee)
        if(err) {
            return res.status(500).json(err);
        }
        Entry.find({"employee":updatedEmployee.id}, (err, foundEntryByEmployee) => {
            if(err) {
                return res.status(500).json(err);
            }
            res.render('profile.ejs', {
                employee: updatedEmployee,
                entries: foundEntryByEmployee
            })
        })
    });
}

module.exports = {
    createEmployee,
    showEmployee,
    showAllEmployees,
    deleteEmployee,
    editEmployee,
    renderSignUp,
    renderLogin,
    login
}