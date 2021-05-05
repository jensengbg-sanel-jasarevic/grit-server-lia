exports.up = function(knex) {
    return knex.schema
    .createTable("sketches", tbl => { // Callback function to modify the table's structure, using the schema-building commands
      tbl.increments('id').primary() 
      tbl.text("message")
      tbl.timestamps(true, true) 
    })

    .createTable("drafts", tbl => { 
      tbl.increments(),
      tbl.text("message")
      tbl.timestamps(true, true);

      tbl
        .integer("sketch_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("sketches")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
        
    .createTable("orders", tbl => { 
      tbl.increments()
      tbl.text("message")
      tbl.timestamps(true, true);
    })
  }
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists("sketches")
  };
  
  // Create a migration that will populate data folder, npx knex migrate:latest 