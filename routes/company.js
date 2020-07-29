const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/', ctrl.company.createCompany);
router.get('/all', ctrl.company.showAllCompanies);
router.get('/:id', ctrl.company.showCompany);
// router.put('/company', ctrl.company.addEmployeeToCompany);
router.put('/:id', ctrl.company.editCompany);