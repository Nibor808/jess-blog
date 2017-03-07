
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('Posts').insert([
        {
          title: 'This Thing Rocks',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'Rocking Things',
          keywords: 'rocking, thing',
          createdAt: new Date()
        },
        {
          title: 'This Is Not Such A Great Thing',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'Not Great Things',
          keywords: 'not, great, thing',
          createdAt: new Date()
        },
        {
          title: 'Meh. Mediocre',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'Mediocre Things',
          keywords: 'mediocre, thing',
          createdAt: new Date()
        },
      ]);
    });
};
