const express = require ("express");
const dbQueries = require("../model/database-queries")

const router = express.Router() 

// GET sketches
router.get("/", (req, res) => {
    res.json( { message: "Homeeee"} )
})

module.exports = router;