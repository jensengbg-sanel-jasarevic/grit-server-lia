const express = require ("express");
const dbQueries = require("../model/database-queries")

const router = express.Router() 

// POST draft to orders 
router.post("/:id", async (req, res) => {
    await dbQueries.findDraft(parseInt(req.params.id))
    
    .then(order => {    
        order.message = `Draft record added to order table`
        dbQueries.addDraftToOrders(order)
        res.status(201).json(order)
        })
        .catch(error => { 
            res.status(500).json({ message: "Unable to perform operation" })
        });
})

// GET orders
router.get("/", (req, res) => {
    dbQueries.getOrders()
    
    .then(orders => { 
        res.status(200).json(orders)
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve orders" })
    });
});

module.exports = router;