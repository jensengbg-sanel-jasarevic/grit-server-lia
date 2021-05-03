// Middlefile, interacts with knexfile
const dbEngine = process.env.DB_ENVIRONMENT || "development";

// Property accessors provide access to an object's properties by using the dot notation or the bracket notation
const config = require("./knexfile")[dbEngine]; // Bracket notation can take strings

module.exports = require("knex")(config); // Use database client that is being assigned to config variable, function knex(config) 