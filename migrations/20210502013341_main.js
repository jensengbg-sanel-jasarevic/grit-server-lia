// The up function is where we write code that updates the database to the next version.
// The down function is where we write code that restores the previous version of the database.
// Run 'npx knex migrate:latest' to create migration that will populate 'data' folder.  

exports.up = function(knex) {
  // Database schema represents the internal structure of the database. How e.g. tables, columns are organized and related in the database.
    return knex.schema
    // We pass the table name as the first argument and a callback function as the second argument..
    .createTable("sketches", tbl => { // Callback function to modify table's structure using the schema-building commands/methods.
      // To create columns we call methods on the tbl object. Depending on the column we want to create, we call different methods.
      // One column that most tables have is a primary key column. This column is used to keep the record id, and it usually contains an auto incremented integer.
      tbl.increments() // Here's how we create a primary key column named 'id' that will be incremented each time a record is created:
      tbl.text("message")
      tbl.text("filename")
      tbl.timestamps(true, true) 
    })

    .createTable("drafts", tbl => { 
      tbl.increments()
      tbl.text("message")
      tbl.text("filename")
      tbl.text("rejected")
      tbl.timestamps(true, true);
    })
        
    .createTable("orders", tbl => { 
      tbl.increments()
      tbl.text("message")
      tbl.text("filename")
      tbl.text("rejected")
      tbl.timestamps(true, true);
    })

    .createTable("clients", (tbl) => {
      tbl.increments(); 
      tbl.text("messages")
      tbl.integer("messagesId")
      tbl.text("filename")
      tbl.timestamps(true, true);
    })

    .createTable("contacts", (tbl) => {
      tbl.increments();
      tbl.text("messages")
      tbl.integer("messagesId")
      tbl.text("filename")
      tbl.timestamps(true, true);
    })
  }
  
  // Reverse our migrations, in the down function of our migration file we add code that removes the whole table we created in the up function.
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists("sketches")
  };