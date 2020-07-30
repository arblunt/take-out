const Entry = require('../models').Entry


const createEntry = (req, res) => {
    Employee.create(req.body, (err, createEntry) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(createEntry);
    });
}
const showEntry = (req,res) => {
    Entry.findbyId(req.params.id)
    .populate('entry')
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
        res.status(200).json(foundAllEntries);
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