const express = require ("express");
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const dbQueries = require("../model/database-queries")

const router = express.Router() 

// POST Generate userkey
router.post("/userkey", async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
    jwt.verify(token, process.env.JWT_KEY); 

    const userKey = shortid.generate()
    
    dbQueries.addUserKey({ key: userKey })
    
    res.status(200).json({userKey: userKey })
    } catch(err) {
    res.status(403).send(err)        
    }
})

// POST Registration authentication
router.post("/registration", async (req, res) => {
    const userKey = req.body.userkey
    const username = req.body.username
    const password = req.body.password

    let authentication = await dbQueries.findUserKey(userKey)

    if(authentication.length > 0 && authentication[0].activated === null) { 
        await dbQueries.updateUserKey(userKey)
        dbQueries.addUser({ name: `${username}`, password: `${password}` })
        res.status(201).send('User created.')             
    } else {
        res.status(400).send('Client error. Lacks valid authentication credentials.')
    }
})

// POST Login authentication & authorization
router.post("/", async (req, res) => {
    let credentials = {
     username: req.body.username,
     password: req.body.password
    }

    let authentication = await dbQueries.findUser(credentials.username)

    if(authentication.length > 0) { 
        // Access granted. Authorized user.
        const token = jwt.sign({ username: authentication[0].name }, process.env.JWT_KEY);
        res.status(200).send({ token: token, user: authentication[0].name }) 
    } else {
        res.status(401).send('Lacks valid authentication credentials.');
    }
})

module.exports = router;