module.exports = {
  
    development: {
      client: 'sqlite3', 
      useNullAsDefault: true, // Gets rid of bunch of bugs just for sqlite.
      connection: {
        // We first define a database connection and a migrations directory.
        // Generate a migration file invoking the 'knex migrate:make'. Schema builder will be in this file. All tables should be defined there.
        // Run 'npx knex migrate:latest' to drop our schema builder with tables (database) to directory defined below. 
        filename: "./data/main.db3", // SQLite can have extension '.db3' or '.sqlite3'. 
        // This is now the file with the database.
      },
      pool: {
        // Enforce foreign keys relationship between tables.
        afterCreate: (conn, done) => {
          conn.run("PRAGMA foreign_keys = ON", done);
        },
      },
    },
    production: {
      client: "pg", // Determine which database management system should be used.
      connection: { 
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    },  
      // Required by Knex documentation. 
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