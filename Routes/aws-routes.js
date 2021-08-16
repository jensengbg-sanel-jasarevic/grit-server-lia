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

// Creating an instance of an object that has a constructor function.
const s3 = new AWS.S3({ // Initialization for S3. Requests two keys that we will pass our credentials to, accessKeyId & secretAccessKey.
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
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

    const params = { // Configuration AWS Bucket.
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidv4()}.${fileType}`,
        Body: req.file.buffer
    }
    /*
    // S3 upload function
    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }
        res.status(200).send(data)
    })
    */
})

module.exports = router;