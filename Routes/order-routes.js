const express = require ("express");
const shortid = require('shortid');

const dbQueries = require("../models/database-queries")

const router = express.Router() 

// POST draft to orders & mailbox
router.post("/:id", async (req, res) => {
    await dbQueries.findDraft(parseInt(req.params.id))
    
    .then(order => {    
        order.message = `Draft record (${shortid.generate()}) added for order table`
        order.confirmation = "Order confirmed"
        dbQueries.addDraftToOrders(order)
        dbQueries.addToMailbox(order)
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