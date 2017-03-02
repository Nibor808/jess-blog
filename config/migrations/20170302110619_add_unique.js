
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('Users', function(table) {
    table.unique('username');
    table.unique('email');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('Users', function(table) {
    table.dropUnique('username');
    table.dropUnique('email');
  })
};
