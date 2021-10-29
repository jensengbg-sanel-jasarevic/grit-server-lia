const express = require ("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbQueries = require("../model/database-queries")

const salt = bcrypt.genSaltSync(10);
const router = express.Router() 

// POST Registration authentication
router.post("/registration", async (req, res) => {
    const userKey = req.body.userkey


        let authentication = await dbQueries.findUserKey(userKey)

            res.status(201).json(authentication)             
        
})

// POST Login authentication & authorization
router.post("/login", async (req, res) => {
    let credentials = {
     username: req.body.username,
     password: req.body.password
    }

    let authentication = await dbQueries.findUser(credentials.username)

    if(authentication.length > 0) { 
        const valid = await bcrypt.compareSync(credentials.password, authentication[0].password)
         if (valid){
            // Access granted. Authorized user.
            const token = jwt.sign({ username: authentication[0].name }, process.env.JWT_KEY);
            res.status(200).send({ token: token, role: authentication[0].role, name: authentication[0].name }) 
         } else {
            res.status(401).send('Lacks valid authentication credentials.');
        }
    } else {
        res.status(403).send('Client does not have access rights to the content.');
    }
})

module.exports = router;