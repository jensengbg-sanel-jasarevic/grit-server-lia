const express = require ("express");
const dbQueries = require("../models/database-queries")

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

// PATCH update/change sketch
router.patch("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    const changes = req.body;
    
    dbQueries.updateSketch(id, changes)
    .then(updated => { 
        if (updated) {
            res.status(200).json(updated)
        } else { 
            res.status(404).json({ message: "Record not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to perform operation" });
    });
});

module.exports = router;