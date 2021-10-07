const express = require ("express");
const dbQueries = require("../model/database-queries")
const DigitalOceanSpaces = require("../model/object-storage")
// Middleware for handling multipart/form-data, which is primarily used for uploading files.
// Multer adds a body object and a file or files object to the request object. In HTML form tag have to include attribute enctype="multipart/form-data".
const multer = require("multer") 

const storage = multer.memoryStorage() // Storage option for Multer.
// Multer accepts an options object, 'storage' is one of the options that can be passed.
// Name for key in object is 'image', value should be the file being uploaded. Will accept just a single file.
const upload = multer({ storage: storage }).single("image") 

const router = express.Router() 

// POST record to sketch table & upload file to cloud storage system 
// Multer passed as middleware to endpoint. Handled first in this operation.
router.post("/", upload, async (req, res) => { 
    let myFile = req.file.originalname.split(".") 
    const fileType = myFile[myFile.length - 1]
    
    const params = { // Configuration for uploading file to Bucket.
        Bucket: process.env.BUCKET_NAME,
        Key: `${myFile[0]}.${fileType}`,
        Body: req.file.buffer
    };

    dbQueries.addSketch({ message: `Sketch record added to sketch table`, filename: `${req.file.originalname}` })
    .then(response => { 
        res.status(200).json({ message: `Record added to sketch table #${response}.` })
    })
    .catch(error => { 
        console.error(error)
        res.status(500).json({ message: "Could not add record to sketch table." })
    })

    DigitalOceanSpaces.s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        } else {
        res.status(200).send(data)
        }
    })
 })

// GET sketches
router.get("/", async (req, res) => {
    dbQueries.getSketches()
    
    .then(success => { 
        res.status(200).json(success) 
    })
    .catch(error => { 
        res.status(500).json({ message: "Unable to retrieve sketches" })
    });
})

module.exports = router;