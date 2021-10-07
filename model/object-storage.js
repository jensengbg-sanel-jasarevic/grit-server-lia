// Software development kit for start using any services for Amazon Web Services.
const AWS = require("aws-sdk") 

const spacesEndpoint = new AWS.Endpoint('ams3.digitaloceanspaces.com');

// Creating an instance of an object that has a constructor function.
const s3 = new AWS.S3({ // Initialization. Passing the credentials.
    endpoint: spacesEndpoint,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
}) // AWS SDK Configurated. Connected to Amazon S3 API to start using the services.

module.exports = {
    s3
};