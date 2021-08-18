const express = require ("express");
const dbQueries = require("../model/database-queries")
const shortid = require('shortid');

const router = express.Router() 

// GET home page
router.get("/", (req, res) => {
    res.json( { message: "Welcome"} )
})

// POST record to sketches & drafts table
router.post("/", async (req, res) => {
    const sketchID = shortid.generate()

    dbQueries.addSketch({ message: `Sketch record (${sketchID}) added for sketch table` })
    .then(response => { 
    console.log(response)
    })
    .catch(error => { 
        console.error(error);
    })

    dbQueries.addSketchToDrafts({ message: `Sketch (${sketchID}) record added to draft table` })
     .then(response => { 
         console.log(response)
         res.status(200).json(response) 
    })
     .catch(error => { 
         res.status(500).json({ message: "Unable to perform operation" }) });
 })

module.exports = router;