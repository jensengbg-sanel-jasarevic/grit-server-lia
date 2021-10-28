const express = require ("express");
const dbQueries = require("../model/database-queries")

const router = express.Router() 

// GET orders
router.get("/", (req, res) => {
    dbQueries.getOrders()
    
    .then(orders => { 
        res.status(200).json(orders)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve orders." })
    });
});

// POST order
router.post("/", async (req, res) => {
    try {
        await dbQueries.findDraft(req.body.id)
        let orderObj = {
            client: req.body.client,
            draftId: req.body.id,
            filename: req.body.filename
        }
        dbQueries.addOrder(orderObj)
        res.status(201).json(orderObj)
    }catch(error) {
    res.status(404).json({ message: "Requested resource was not found." })
    }
})

module.exports = router;