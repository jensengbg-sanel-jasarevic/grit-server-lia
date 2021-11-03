const express = require ("express");
const dbQueries = require("../model/database-queries")

const router = express.Router() 

// GET specific user
router.get("/:user", async (req, res) => {
    await dbQueries.findUser(req.params.user)    
    .then(success => { 
        res.status(200).json(success)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to perform request." })
    });
})

// PATCH user deactivate
router.patch("/", async (req, res) => { 
     await dbQueries.updateUser(req.body.user, "inactive")
    .then(updated => {
        res.status(200).json(updated);
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to perform request." });
    });
});

module.exports = router;