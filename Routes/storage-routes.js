const express = require ("express");
// Multer = middleware for handling multipart/form-data, which is primarily used for uploading files.
// Multer adds a body object and a file or files object to the request object (req.file/files). 
// The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
// In html file, attribute enctype="multipart/form-data" must be included to form tag.
const multer = require("multer") 
const AWS = require("aws-sdk") // Software development kit for start using any services for Amazon Web Services.
const { v4: uuidv4 } = require('uuid');

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

// Endpoint for files from the form-data for uploading to S3 bucket.
// To this POST endpoint the middleware passed in is Mutler, that is the variable 'upload' which will be handled first in this operation. 
router.post("/", upload, (req, res) => {
    let myFile = req.file.originalname.split(".")  // Split into array of substrings.
    const fileType = myFile[myFile.length - 1]

    const params = { // Configuration for uploading file to Bucket.
        Bucket: process.env.BUCKET_NAME,
        Key: `${uuidv4()}.${fileType}`,
        Body: req.file.buffer
    };

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }
        res.status(200).send(data)
    })
})

// GET list of all files in a 'Space'
router.get("/:space", (req, res) => {
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
router.get("/", (req, res) => {
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