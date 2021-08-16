const express = require ("express");
const dbQueries = require("../model/database-queries")

const router = express.Router() 

// GET sketches
router.get("/", async (req, res) => {
    dbQueries.getSketches()
    
    .then(success => { 
        res.status(200).json(success) 
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve sketches" })
    });
})

module.exports = router;