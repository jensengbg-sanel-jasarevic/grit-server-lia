const express = require ("express");
// Middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer = require("multer") // Multer adds a body object and a file or files object to the request object. In HTML form tag have to include attribute enctype="multipart/form-data".
const AWS = require("aws-sdk")
const dbQueries = require("../model/database-queries")

const router = express.Router() 
const storage = multer.memoryStorage() // Storage option for Multer.

// Multer accepts an options object, 'storage' is one of the options that can be passed.
const upload = multer({ storage: storage }).single("image") // Name for key in object is 'image', value should be the file being uploaded. Will accept just a single file.

const spacesEndpoint = new AWS.Endpoint('ams3.digitaloceanspaces.com');

const s3 = new AWS.S3({ 
    endpoint: spacesEndpoint,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

// POST record sketch table & upload file to cloud storage system 
router.post("/", upload, async (req, res) => { // Pass middleware (multer) to this endpoint to be handled first in this operation ('upload' variable).
    let myFile = req.file.originalname.split(".") // Split into array of substrings.
    const fileType = myFile[myFile.length - 1]
    
    const params = { // Configuration for uploading file to Bucket.
        Bucket: process.env.BUCKET_NAME,
        Key: `${myFile[0]}.${fileType}`,
        Body: req.file.buffer
    };

    dbQueries.addSketch({ message: `Sketch record added to sketch table`, filename: `${req.file.originalname}` })
    .then(response => { 
        console.log(response)
        res.status(200).json({ message: "Record added to sketch table." })
    })
    .catch(error => { 
        console.error(error)
        res.status(500).json({ message: "Could not add record to sketch table." })
    })

    s3.upload(params, (error, data) => {
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