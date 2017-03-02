
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('Comments').insert([
        {
          title: 'A Good Comment',
          content: 'Wow! Check out how great this comment is.',
          post_id: 1,
          user_id: 1,
          createdAt: new Date()
        },
        {
          title: 'A Better Comment',
          content: 'Wow! Check out how much better this comment is.',
          post_id: 1,
          user_id: 2,
          createdAt: new Date()
        },
        {
          title: 'A Great Comment',
          content: 'Amazing! Check out how super awesomely great this comment is.',
          post_id: 1,
          user_id: 3,
          createdAt: new Date()
        },
        {
          title: 'What Are You Talking About?',
          content: 'I\'m not sure you know what you\'re talking about.',
          post_id: 2,
          user_id: 3,
          createdAt: new Date()
        },
        {
          title: 'I Think She Get\'s It',
          content: 'She totally get\'s the subject matter.',
          post_id: 2,
          user_id: 1,
          createdAt: new Date()
        },
        {
          title: 'This This Is Awesome!',
          content: 'I can\'t belive I didn\'t know about this before!' ,
          post_id: 3,
          user_id: 2,
          createdAt: new Date()
        }
      ]);
    });
};