const dbEngine = process.env.DB_ENVIRONMENT || "development";

// Property accessors provide access to an object's properties by using the dot notation or the bracket notation.
// Syntax: object.property or object['property']
const config = require("./knexfile")[dbEngine]; // Get 'production' or 'development' object. Object's keys = properties (e.g. client, connection, pool).

module.exports = require("knex")(config); // Passing variable 'config' as argument to 'knex' module.  
// Knex module now configurated to know which database management system to use.
// When importing this file (db-config.js) anywhere in project it will now handle all configurations regarding which database management system app should use.  