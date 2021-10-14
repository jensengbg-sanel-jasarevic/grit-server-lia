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

router.post("/", async (req, res) => {
    await dbQueries.findDraft(req.body.id)
    
    .then(order => {
        if (order){
            let orderObj = {
                message: "Draft record added to order table.",
                filename: `${req.body.filename}`,
            }
            dbQueries.addOrder(orderObj)
            res.status(201).json(orderObj)
        }
        else { 
            res.status(404).json({ message: "Requested resource was not found." })
        }
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to perform operation. No parameters received." });
    }); 
})

module.exports = router;