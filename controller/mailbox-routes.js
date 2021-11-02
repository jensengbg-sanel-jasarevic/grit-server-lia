const express = require ("express");
const jwt = require('jsonwebtoken');
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
    const token = req.headers['authorization'].split(' ')[1];

    try {
        jwt.verify(token, process.env.JWT_KEY); 

        if (req.body.text && req.body.draftId && req.body.filename) {
           let mailbox = await dbQueries.addMailbox({ 
                sender: `${req.body.sender}`,
                receiver: `${req.body.receiver}`, 
                message: `${req.body.text}`,
                filename: `${req.body.filename}`,
                draftId: `${req.body.draftId}`
             })
             res.status(200).json(mailbox)
            } else {
                res.status(400).json({ message: "Required data values missing from client request." }) 
            }                  
    }catch(err) {
        res.status(401).json({ message: "Unauthorized." }) 
    }   
 })

module.exports = router;