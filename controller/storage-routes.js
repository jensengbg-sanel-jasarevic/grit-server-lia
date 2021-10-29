const express = require ("express");
const dbQueries = require("../model/database-queries")
const DigitalOceanSpaces = require("../model/object-storage")
const multer = require("multer") 
// Middleware for handling multipart/form-data, which is primarily used for uploading files.
// Multer adds a body object and a file or files object to the request object. In HTML form tag have to include attribute enctype="multipart/form-data".

const storage = multer.memoryStorage() // Storage option for Multer.
// Multer accepts an options object, 'storage' is one of the options that can be passed.
// Name for key in object is 'image', value should be the file being uploaded. Will accept just a single file.
const upload = multer({ storage: storage }).single("image") 

const router = express.Router() 

// POST record to sketch table & upload file to cloud storage system 
router.post("/", upload, async (req, res) => { // Multer passed as middleware to endpoint. Handled first in this operation.
    let myFile = req.file.originalname.split(".") 
    const fileType = myFile[myFile.length - 1]
    
    const params = { // Configuration for uploading file to Bucket.
        Bucket: process.env.BUCKET_NAME,
        Key: `${myFile[0]}.${fileType}`,
        Body: req.file.buffer
    };

    dbQueries.addSketch({ filename: `${req.file.originalname}` })
        DigitalOceanSpaces.s3.upload(params, (error, data) => {
            if(error){
                res.status(500).send(error)
            } else {
            res.status(200).send(data)
            }
        })
})

// GET file from a 'Space'
router.get("/space/:filename", (req, res) => {
    let params = {
        Bucket: process.env.BUCKET_NAME,
        Key: req.params.filename
    };
    
    DigitalOceanSpaces.s3.getObject(params, function(err, data) {
        if (err) {
            res.status(404).send(err)
        } 
        else {
          res.status(200).send(data)
        }
    });
})

// GET all files from a 'Space'
router.get("/space", (req, res) => {
    let params = {
        Bucket: process.env.BUCKET_NAME
    };

    DigitalOceanSpaces.s3.listObjectsV2(params, function (error, data) {
        if (!error) {
            let files = []
            // Get Contents array from response data object.
            data.Contents.forEach(function (element) {
                // Inside every item in the array get the file & push to 'files' array.
                files.push({
                    filename: element.Key
                });
            });
            res.status(200).send(files)
        } else {
            res.status(403).send(error)
        }
    });
})

// GET all 'Spaces'
router.get("/", (req, res) => {
    DigitalOceanSpaces.s3.listBuckets({}, function(error, data) {
        if (error) {
        res.status(500).send(error)
        } 
        else {
            data['Buckets'].forEach(function(space) {
                console.log(space['Name']);
            })
            res.status(200).send(data)
        };
    });
})

module.exports = router;