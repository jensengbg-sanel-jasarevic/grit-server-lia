const express = require ("express");
const dbQueries = require("../models/database-queries")

const router = express.Router() 

// GET mailbox
router.get("/", (req, res) => {
    dbQueries.getContactsMailbox()
    
    .then(mailbox => { 
        res.status(200).json(mailbox)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve mailbox" })
    });
});

// GET mailbox user
router.get("/user", (req, res) => {
    dbQueries.getClientsMailbox()
    
    .then(mailbox => { 
        res.status(200).json(mailbox)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve mailbox" })
    });
});

// POST client mailbox
router.post("/", async (req, res) => {
    dbQueries.addToClientsMailbox(updated)
    dbQueries.addSketch({ message: `Sketch record (${sketchID}) added for sketch table` })
    dbQueries.addSketchToDrafts({ message: `Sketch (${sketchID}) record added to draft table` })
     .then(lessons => { 
         res.status(200).json(lessons) })
     .catch(error => { 
         res.status(500).json({ message: "Unable to perform operation" }) });
 })

module.exports = router;