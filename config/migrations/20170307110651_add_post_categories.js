
exports.up = function(knex, Promise) {
  return knex.schema.table('Posts', function(table) {
    table.string('category').notNull();
    table.string('keywords').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Posts', function(table) {
    table.dropColumn('category');
    table.dropColumn('keywords');
  })
};
