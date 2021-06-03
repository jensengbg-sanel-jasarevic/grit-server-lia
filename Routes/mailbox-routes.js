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
router.post("/user", async (req, res) => {
    const changes = req.body;
console.log("changes", changes)
    dbQueries.addToClientsMailbox({ message: `Sketch record added to draft table` })
     .then(data => { 
         res.status(200).json(data)
        })
     .catch(error => { 
         res.status(500).json({ message: "Unable to add message" }) });
 })

module.exports = router;