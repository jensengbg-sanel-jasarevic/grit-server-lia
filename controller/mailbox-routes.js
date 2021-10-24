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
    if (req.body.textId && req.body.filename) {
    dbQueries.addContactsMailbox({ messages: `${req.body.text}`, messagesId: `${req.body.textId}`, username: "user", filename: `${req.body.filename}` })
    .then(data => { 
         res.status(200).json(data)
        })
        .catch(error => { 
            res.status(500).json({ message: "Operation could not be performed on database." }) 
        });
    }
    else {
        res.status(400).json({ message: "Required data values missing from client request." }) 
    }        
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
    if (req.body.text && req.body.textId && req.body.filename) {
        dbQueries.addClientsMailbox({ messages: `${req.body.text}`, messagesId: `${req.body.textId}`, adminName: "contacts", filename: `${req.body.filename}` })
        .then(data => { 
            res.status(200).json(data)
           })
        .catch(error => { 
            res.status(500).json({ message: "Operation could not be performed on database." }) 
        });
    }
    else {
      res.status(400).json({ message: "Required data values missing from client request." }) 
  }
 })

module.exports = router;