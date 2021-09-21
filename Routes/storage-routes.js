const express = require ("express");
// Multer = middleware for handling multipart/form-data, which is primarily used for uploading files.
// Multer adds a body object and a file or files object to the request object (req.file/files). 
// The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
// Attribute enctype="multipart/form-data" must be included to form tag (in html file).
const multer = require("multer") 
const AWS = require("aws-sdk") // Software development kit for start using any services for Amazon Web Services.
const shortid = require('shortid');

const dbQueries = require("../model/database-queries")
const router = express.Router() 

const spacesEndpoint = new AWS.Endpoint('ams3.digitaloceanspaces.com');

// Creating an instance of an object that has a constructor function.
const s3 = new AWS.S3({ // Initialization for S3. Passing the credentials.
    endpoint: spacesEndpoint,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const storage = multer.memoryStorage() // Storage option for Multer.

// Multer accepts an options object, 'storage' is one of the options that can be passed.
// Pass to key 'storage' the variable with same name that was created before 
const upload = multer({ storage: storage }).single("image") // Name for key in object is 'image', value should be the file being uploaded. Will accept just a single file.

// POST record to sketches & drafts table. 
// Endpoint for form-data (file uploading).
// Middleware ('upload' variable) passed into this endpoint is Mutler. Will be handled first in this operation. 
router.post("/", upload, (req, res) => {
    const sketchID = shortid.generate()
    let myFile = req.file.originalname.split(".") // Split into array of substrings.
    const fileType = myFile[myFile.length - 1]
    
    const params = { // Configuration for uploading file to Bucket.
        Bucket: process.env.BUCKET_NAME,
        Key: `${myFile[0]}.${fileType}`,
        Body: req.file.buffer
    };

    dbQueries.addSketch({ message: `Sketch record (${sketchID}) added for sketch table` })
    .then(response => { 
    console.log(response)
    })
    .catch(error => { 
        console.error(error);
    })

    dbQueries.addSketchToDrafts({ message: `Sketch (${sketchID}) record added to draft table` })
    .then(response => { 
        console.log(response)
    })
    .catch(error => { 
        console.error(error);
    })

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        } else {
        res.status(200).send(data)
        }
    })
})

// GET a file from Space (download).
router.get("/space/:filename", (req, res) => {
    let params = {
        Bucket: "match",
        Key: req.params.filename
    };
    
    s3.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else   {
          res.status(200).send(data)
        }
    });
})

// GET list of all files in a 'Space'.
router.get("/space", (req, res) => {
    let params = {
        Bucket: process.env.BUCKET_NAME
    };

    s3.listObjectsV2(params, function (error, data) {
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
            res.status(500).send(error)
        }
    });
})

// GET list of all 'Spaces'
router.get("/spaces", (req, res) => {
    s3.listBuckets({}, function(error, data) {
        if (error) {
        res.status(500).send(error)
        } else {
            data['Buckets'].forEach(function(space) {
                console.log(space['Name']);
            })
            res.status(200).send(data)
        };
    });
})

module.exports = router;