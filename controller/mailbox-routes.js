const express = require ("express");
const dbQueries = require("../model/database-queries")

const router = express.Router() 

// GET mailbox
router.get("/", (req, res) => {
    dbQueries.getMailbox()
    
    .then(mailbox => { 
        res.status(200).json(mailbox)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve mailbox" })
    });
});

 // POST mailbox
 router.post("/", async (req, res) => {
    if (req.body.text && req.body.draftId && req.body.filename) {
    dbQueries.addMailbox({ 
        sender: `${req.body.sender}`,
        receiver: `${req.body.receiver}`, 
        message: `${req.body.text}`,
        filename: `${req.body.filename}`,
        draftId: `${req.body.draftId}`
     })
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