
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('Posts', function(table) {
      table.increments('id').primary();
      table.string('title').notNull();
      table.text('content').notNull();
      table.dateTime('createdAt').notNull();
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('Comments', function(table) {
          table.increments('id').primary();
          table.integer('post_id').unsigned();
          table.foreign('post_id').references('id').inTable('Posts');
          table.string('title').nullable();
          table.text('content').notNull();
          table.dateTime('createdAt').notNull();
        });
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('Users', function(table) {
          table.increments('id').primary();
          table.string('email').notNull();
          table.string('username').notNull();
          table.integer('comment_id').unsigned();
          table.foreign('comment_id').references('id').inTable('Comments');
        });
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Posts')
    .dropTableIfExists('Comments')
    .dropTableIfExists('Users');
};
