
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('Users', function(table) {
      table.increments('id').primary();
      table.string('email').notNull();
      table.string('username').notNull();
      table.string('password').notNull();
      table.string('passResetToken').nullable();
      table.unique('username');
      table.unique('email');
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('Posts', function(table) {
          table.increments('id').primary();
          table.string('title').notNull();
          table.text('content').notNull();
          table.string('category').notNull();
          table.string('keywords').notNull();
          table.dateTime('createdAt').notNull();
        });
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('Reviews', function(table) {
          table.increments('id').primary();
          table.string('title').notNull();
          table.text('content').notNull();
          table.string('category').notNull();
          table.string('keywords').notNull();
          table.string('pros').nullable();
          table.string('cons').nullable();
          table.json('specs').nullable();
          table.dateTime('createdAt').notNull();
        });
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('Questions', function(table) {
          table.increments('id').primary();
          table.string('title').notNull();
          table.text('content').notNull();
          table.string('answer').nullable();
          table.string('category').notNull();
          table.string('keywords').notNull();
          table.dateTime('createdAt').notNull();
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
          table.integer('review_id').unsigned();
          table.foreign('review_id').references('id').inTable('Reviews').onDelete('CASCADE');
          table.integer('question_id').unsigned();
          table.foreign('question_id').references('id').inTable('Questions').onDelete('CASCADE');
          table.integer('parent_comment_id').nullable();
          table.string('title').nullable();
          table.text('content').notNull();
          table.dateTime('createdAt').notNull();
        });
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('Images', function(table) {
          table.increments('id').primary();
          table.integer('post_id').unsigned();
          table.foreign('post_id').references('id').inTable('Posts').onDelete('CASCADE');
          table.integer('review_id').unsigned();
          table.foreign('review_id').references('id').inTable('Reviews').onDelete('CASCADE');
          table.string('file').notNull();
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
    return knex.schema.table('Images', function(table) {
      table.dropForeign('post_id');
      table.dropColumn('post_id');
      table.dropForeign('user_id');
      table.dropColumn('user_id');
    });
  })
  .then(function() {
    return knex.schema
      .dropTableIfExists('Users')
      .dropTableIfExists('Posts')
      .dropTableIfExists('Comments')
      .dropTableIfExists('Images');
  })
};
