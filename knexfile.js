module.exports = {
  
    development: {
      client: 'sqlite3', 
      useNullAsDefault: true, // Gets rid of bunch of bugs just for sqlite.
      connection: {
        // Our database. Type what name file should have when running -> knex migrate:latest
        filename: "./data/main.db3",
      },
      pool: {
        // Enforce foreign keys relationship between tables
        afterCreate: (conn, done) => {
          conn.run("PRAGMA foreign_keys = ON", done);
        },
      },
    },
    production: {
      client: "pg", // Determine which database being used
      connection: { 
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    },  
      // Required according to knex documentation 
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tablename: "knex_migrations",
        // Where to store 
        directory: "./migrations",
      },
  };
  
  // npx knex migrate:make <create-table-name>