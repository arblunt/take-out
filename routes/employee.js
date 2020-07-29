const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/', ctrl.employee.createEmployee);
router.get('/all', ctrl.employee.showAllEmployees);
router.get('/signup', ctrl.employee.renderSignUp);
router.get('/login', ctrl.employee.renderLogin);
router.post('/login', ctrl.employee.login)
router.get('/:id', ctrl.employee.showEmployee);
router.delete('/:id', ctrl.employee.deleteEmployee);
router.put('/:id', ctrl.employee.editEmployee);


module.exports = router;
