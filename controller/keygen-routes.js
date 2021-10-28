const express = require ("express");
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const dbQueries = require("../model/database-queries")

const router = express.Router() 

// POST Generate userkey
router.post("/", async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
    jwt.verify(token, process.env.JWT_KEY); 

    const userKey = shortid.generate()
    
    dbQueries.addUserKey({ key: userKey })
    
    res.status(200).json({userKey: userKey })
    } catch(err) {
    res.status(403).send(err)        
    }
})

module.exports = router;