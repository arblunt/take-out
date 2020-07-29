const Employee = require('../models').Employee;


const createEmployee = (req, res) => {
    Employee.create(req.body, (err, createdEmployee) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(createdEmployee);
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
        // res.status(200).json(foundEmployee);
      res.render('profile.ejs')
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
        res.render('profile.ejs')
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
        res.status(200).json(deleteEmployee);
    });
}

const editEmployee = (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedEmployee) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(200).json(updatedEmployee)
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