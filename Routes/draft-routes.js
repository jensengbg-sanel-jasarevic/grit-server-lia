const express = require ("express");
const dbQueries = require("../models/database-queries")

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

// DELETE specific draft
router.delete("/:id", (req, res) => {
    dbQueries.removeDraft(parseInt(req.params.id))

    .then(count => { 
        if (count > 0) { // Knex del() returns number of affected rows deleted
            res.status(200).json({ message: "Draft successfully deleted" });
        } else { 
            res.status(404).json({ message: "Record not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to perform operation" });
    });
});

// POST comment for a draft
router.post("/:id", async (req, res) => {
    await dbQueries.updateDraft(req.params.id, req.body)

    .then(updated => {    
        if (updated) {
            dbQueries.addToMailbox(updated)
            res.status(200).json(updated)
        } else { 
            res.status(404).json({ message: "Record not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to perform operation" });
    });
});        

module.exports = router;