const express = require ("express");
const jwt = require('jsonwebtoken');
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
    const token = req.headers['authorization'].split(' ')[1];
    
    try {
        jwt.verify(token, process.env.JWT_KEY); 

        let orderObj = {
            client: req.body.client,
            draftId: req.body.id,
            filename: req.body.filename
        }
        dbQueries.addOrder(orderObj)
        res.status(201).send('Order created.') 
    }catch(error) {
    res.status(401).json({ message: "Unauthorized. Authentication required itself to perform requested operation" })
    }
})

module.exports = router;