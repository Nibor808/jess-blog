
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {email: 're@incubo.ca', username: 'Nibor', password: '123'},
        {email: 'jess@test.com', username: 'Twiggie', password: '456'},
        {email: 'hey@example.com', username: 'Big Daddy', password: '789'},
      ]);
    });
};
