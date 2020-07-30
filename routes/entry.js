const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/', ctrl.entry.createEntry);
router.get('/all', ctrl.entry.showAllEntries);
router.get('/:id', ctrl.entry.showEntry);
router.delete('/:id', ctrl.entry.deleteEntry);
router.put('/:id', ctrl.entry.editEntry);





module.exports = router;