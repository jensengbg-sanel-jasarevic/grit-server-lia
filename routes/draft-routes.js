const express = require ("express");
const dbQueries = require("../model/database-queries")

const router = express.Router() 

// GET drafts
router.get("/", async (req, res) => {
    dbQueries.getDrafts()
    
    .then(success => { 
        res.status(200).json(success)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve drafts" })
    });
})

// GET specific draft
router.get("/:id", (req, res) => {
    dbQueries.findDraft(parseInt(req.params.id))

    .then(draft => {
        if (draft) {
            res.status(200).json(draft);
        } else { 
            res.status(404).json({ message: "Record not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to perform operation" });
    });
});

// POST record drafts table 
router.post("/", async (req, res) => {
   await dbQueries.addDraft({ message: `Sketch record added to draft table`, filename: req.body.filename })
    .then(response => { 
        res.status(201).json({ message: `Record added to draft table #${response}.` })
    })
    .catch(error => { 
        console.error(error)
        res.status(500).json({ message: "Could not add record to draft table." })
    })
})

// DELETE specific draft
router.delete("/", async (req, res) => {  
   await dbQueries.removeDraft(req.body.id)

    .then(count => { 
        if (count > 0) { // Knex del() returns number of affected rows deleted.
            res.status(200).json({ message: "Draft successfully deleted.", filename: req.body.filename, id: req.body.id });
        } 
        else { 
            res.status(404).json({ message: "Record not found." });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to perform operation." });
    });
});

module.exports = router;