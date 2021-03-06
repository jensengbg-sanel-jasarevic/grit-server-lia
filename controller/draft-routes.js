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

// POST record drafts table 
router.post("/", async (req, res) => {
    let exists = await dbQueries.findUser(req.body.receiver)
    
    if(exists.length < 1) {
        res.status(404).json({ message: "User not found." })   
    } 
    else if(exists.length > 0) {
        await dbQueries.addDraft({ 
            sender: req.body.sender,
            receiver: req.body.receiver,
            filename: req.body.filename
            })
        res.status(201).json({ message: "Record added to draft table.", receiver: req.body.receiver })            
    }
})

// PATCH specific draft
router.patch("/", async (req, res) => { 
    await dbQueries.updateDraft(req.body.id, "rejected")

    .then(updated => {
        if (updated) {
            res.status(200).json({ message: "Operation successful"});
        } else { 
            res.status(404).json({ message: "Record not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to perform operation" });
    });

});

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