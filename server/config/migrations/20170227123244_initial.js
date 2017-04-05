
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('Users', function(table) {
      table.increments('id').primary();
      table.string('email').notNull().default('');
      table.string('username').notNull().default('');
      table.string('password').notNull().default('');
      table.string('passResetToken').nullable();
      table.unique(['email', 'username']);
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('ArticleTypes', function(table) {
          table.increments('id').primary();
          table.string('type').notNull().default('');
        });
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('Articles', function(table) {
          table.increments('id').primary();
          table.string('title').notNull().default('');
          table.text('content').notNull().default('');
          table.string('category').notNull().default('');
          table.string('keywords').notNull().default('');
          table.string('cover_img').nullable();
          table.integer('type').unsigned();
          table.foreign('type').references('id').inTable('ArticleTypes');
          table.dateTime('createdAt').notNull();
        });
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('AdditionalInfo', function(table) {
          table.increments('id').primary();
          table.integer('article_id').unsigned();
          table.foreign('article_id').references('id').inTable('Articles').onDelete('CASCADE');
          table.string('pros').nullable();
          table.string('cons').nullable();
          table.json('specs').nullable();
          table.string('answer').nullable();
        });
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('Comments', function(table) {
          table.increments('id').primary();
          table.integer('article_id').unsigned();
          table.foreign('article_id').references('id').inTable('Articles').onDelete('CASCADE');
          table.integer('user_id').unsigned();
          table.foreign('user_id').references('id').inTable('Users').onDelete('CASCADE');
          table.integer('parent_comment_id').nullable();
          table.string('title').nullable();
          table.text('content').notNull().default('');
          table.dateTime('createdAt').notNull();
        });
    })
    .then(function() {
      return knex.schema
        .createTableIfNotExists('Images', function(table) {
          table.increments('id').primary();
          table.integer('article_id').unsigned();
          table.foreign('article_id').references('id').inTable('Articles').onDelete('CASCADE');
          table.string('file').notNull().default('');
        });
    });
};

exports.down = function(knex) {
  return knex.schema.table('Articles', function(table) {
    table.dropForeign('type');
  })
  .then(function() {
    return knex.schema.table('AdditionalInfo', function(table) {
      table.dropForeign('article_id');
    });
  })
  .then(function() {
    return knex.schema.table('Comments', function(table) {
      table.dropForeign('article_id');
    });
  })
  .then(function() {
    return knex.schema.table('Images', function(table) {
      table.dropForeign('article_id');
    });
  })
  .then(function() {
    return knex.schema
      .dropTableIfExists('Users')
      .dropTableIfExists('ArticleTypes')
      .dropTableIfExists('Articles')
      .dropTableIfExists('AdditionalInfo')
      .dropTableIfExists('Comments')
      .dropTableIfExists('Images');
  });
};
