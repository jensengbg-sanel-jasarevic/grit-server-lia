const express = require ("express");
const dbQueries = require("../models/database-queries")

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

// GET mailbox user
router.get("/user", (req, res) => {
    dbQueries.getMailbox()
    
    .then(mailbox => { 
        res.status(200).json(mailbox)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve mailbox" })
    });
});

module.exports = router;