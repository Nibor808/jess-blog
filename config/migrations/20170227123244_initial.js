
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
        .createTableIfNotExists('Users', function(table) {
          table.increments('id').primary();
          table.string('email').notNull();
          table.string('username').notNull();
          table.string('password').notNull();
        });
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('Comments', function(table) {
          table.increments('id').primary();
          table.integer('post_id').unsigned();
          table.foreign('post_id').references('id').inTable('Posts').onDelete('CASCADE');
          table.integer('user_id').unsigned();
          table.foreign('user_id').references('id').inTable('Users').onDelete('CASCADE');
          table.string('title').nullable();
          table.text('content').notNull();
          table.dateTime('createdAt').notNull();
        });
    });
};

exports.down = function(knex) {
  return knex.schema.table('Comments', function(table) {
    table.dropForeign('post_id');
    table.dropColumn('post_id');
    table.dropForeign('user_id');
    table.dropColumn('user_id');
  })
  .then(function() {
    return knex.schema
      .dropTableIfExists('Posts')
      .dropTableIfExists('Comments')
      .dropTableIfExists('Users');
  })
};
