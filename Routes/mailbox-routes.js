const express = require ("express");
const dbQueries = require("../models/database-queries")

const router = express.Router() 

// GET contacts mailbox
router.get("/", (req, res) => {
    dbQueries.getContactsMailbox()
    
    .then(mailbox => { 
        res.status(200).json(mailbox)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve mailbox" })
    });
});

// GET mailbox client
router.get("/client", (req, res) => {
    dbQueries.getClientsMailbox()
    
    .then(mailbox => { 
        res.status(200).json(mailbox)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve mailbox" })
    });
});

// POST to client mailbox
router.post("/client", async (req, res) => {
    dbQueries.addToClientsMailbox({ messages: `${req.body.response}` })
     .then(data => { 
         res.status(200).json(data)
        })
     .catch(error => { 
         res.status(500).json({ message: "Unable to add message" }) });
 })

 // POST to contacts mailbox
router.post("/contacts", async (req, res) => {
    dbQueries.addToContactsMailbox({ messages: `${req.body.response}` })
     .then(data => { 
         res.status(200).json(data)
        })
     .catch(error => { 
         res.status(500).json({ message: "Unable to add message" }) });
 })

module.exports = router;