const express = require ("express");
const DigitalOceanSpaces = require("../model/object-storage")

const router = express.Router() 

// GET a file from 'Space' (download)
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

// GET list of all files in a 'Space'
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

// GET list of all 'Spaces'
router.get("/spaces", (req, res) => {
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