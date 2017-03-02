
exports.up = function(knex) {
  knex.schema.alterTable('Users', function(table) {
    table.unique(['username', 'email']);
  })
};

exports.down = function(knex) {
  knex.schema.alterTable('Users', function(table) {
    table.unique();
  })
};
