
exports.up = function(knex, Promise) {
  return knex.schema.table('Users', function(table) {
    table.string('passResetToken');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Users', function(table) {
    table.dropColumn('passResetToken');
  })
};
