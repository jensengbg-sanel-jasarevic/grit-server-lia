const express = require ("express");
const dbQueries = require("../model/database-queries")

const router = express.Router() 

// GET contacts mailbox
router.get("/contacts", (req, res) => {
    dbQueries.getContactsMailbox()
    
    .then(mailbox => { 
        res.status(200).json(mailbox)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve mailbox" })
    });
});

 // POST to contacts mailbox
 router.post("/contacts", async (req, res) => {
    dbQueries.addToContactsMailbox({ messages: `${req.body.text}`, messagesId: `${req.body.textId}` })
    
    .then(data => { 
         res.status(200).json(data)
        })
     .catch(error => { 
         res.status(500).json({ message: "Unable to add message" }) });
 })

// GET client mailbox 
router.get("/client", (req, res) => {
    dbQueries.getClientsMailbox()
    
    .then(mailbox => { 
        res.status(200).json(mailbox)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve mailbox" })
    });
});

// POST to clients mailbox
router.post("/client", async (req, res) => {
    dbQueries.addToClientsMailbox({ messages: `${req.body.text}`, messagesId: `${req.body.textId}` })

     .then(data => { 
         res.status(200).json(data)
        })
     .catch(error => { 
         res.status(500).json({ message: "Unable to add message" }) });
 })

module.exports = router;