const express = require ("express");
const AWS = require("aws-sdk") // Software development kit for start using any services for Amazon Web Services.
const router = express.Router() 

const spacesEndpoint = new AWS.Endpoint('ams3.digitaloceanspaces.com');

// Creating an instance of an object that has a constructor function.
const s3 = new AWS.S3({ // Initialization for S3. Passing the credentials.
    endpoint: spacesEndpoint,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

// GET a file from Space (download)
router.get("/space/:filename", (req, res) => {
    let params = {
        Bucket: process.env.BUCKET_NAME,
        Key: req.params.filename
    };
    
    s3.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else   {
          res.status(200).send(data)
        }
    });
})

// GET list of all files in a 'Space'
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