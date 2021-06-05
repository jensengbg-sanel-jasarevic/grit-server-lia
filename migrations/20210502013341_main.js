exports.up = function(knex) {
    return knex.schema
    .createTable("sketches", tbl => { // Callback function to modify the table's structure, using the schema-building commands
      tbl.increments()
      tbl.text("message")
      tbl.text("changes")
      tbl.timestamps(true, true) 
    })

    .createTable("drafts", tbl => { 
      tbl.increments()
      tbl.text("message")
      tbl.text("comment")
      tbl.timestamps(true, true);
    })
        
    .createTable("orders", tbl => { 
      tbl.increments()
      tbl.text("message")
      tbl.text("comment")
      tbl.timestamps(true, true);
    })

    .createTable("clients", (tbl) => {
      tbl.increments(); 
      tbl.text("messages")
      tbl.timestamps(true, true);
    })

    .createTable("contacts", (tbl) => {
      tbl.increments();
      tbl.text("comment")
      tbl.text("messages")
      tbl.timestamps(true, true);
    })
  }
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists("sketches")
  };
  
  // Create a migration that will populate data folder, npx knex migrate:latest 