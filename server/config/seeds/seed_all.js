const moment = require('moment');
const knex = require('../../utils/db');

exports.seed = function (knex) {
  return seedUsers()
    .then(function () {
      return seedArticleTypes();
    })
    .then(function () {
      return seedArticles();
    })
    .then(function () {
      return seedAdditionalInfo();
    })
    .then(function () {
      return seedComments();
    })
    .then(function () {
      return seedImages();
    });
};

const spec_data = JSON.stringify({
  "Screen_Size": "27 inches",
  "Resolution": "3840 x 2160",
  "Aspect_Ratio": "16:9",
  "Video_Inputs": "HDMI, MHL, DisplayPort, mini DisplayPort",
  "USB_Ports": "5",
  "Screen_Brightness": "cd/m^2 cd/m^2",
  "Pixel_Response_Time": "6 milliseconds",
  "Rated_Contrast_Ratio": "1000:1",
  "Pixel_Refresh_Rate": "60Hz",
  "Built_In_Speakers": "Yes",
  "Stand_Height": "Yes",
  "Stand_Tilt": "Yes",
  "Stand_Swivel": "Yes",
  "Weight": "25.7 lb",
  "Height": "24.2 inches",
  "Width": "28.9 inches",
  "Depth": "9.4 inches",
  "Warranty_Parts": "36 months",
  "Warranty_Labor": "12 months"
});

function seedUsers() {
  console.log('Seeding users...');
  return knex('Users').del()
    .then(function () {
      return knex('Users').insert([
        { email: 'user1@test.com', username: 'User1', password: '$2a$10$q6TjuJWtfZDAj4E7I9Ngx.XvmkUG5jzZR/M4fpUOWjrbV0lQplCWa' },
        { email: 'admin@test.com', username: 'Admin', password: '$2a$10$q6TjuJWtfZDAj4E7I9Ngx.XvmkUG5jzZR/M4fpUOWjrbV0lQplCWa' },
        { email: 'user2@test.com', username: 'User2', password: '$2a$10$q6TjuJWtfZDAj4E7I9Ngx.XvmkUG5jzZR/M4fpUOWjrbV0lQplCWa' },
      ]);
    });
};

function seedArticleTypes() {
  console.log('Seeding Types...');
  return knex('ArticleTypes').del()
    .then(function () {
      return knex('ArticleTypes').insert([
        { type: 'post' },
        { type: 'review' },
        { type: 'question' }
      ]);
    });
}

function seedArticles() {
  console.log('Seeding articles...');
  return knex('Articles').del()
    .then(function () {
      return knex('Articles').insert([
        {
          title: 'This Monitor Rocks',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'monitors',
          keywords: 'price',
          preview: false,
          type: 1,
          cover_img: 'monitor1.png',
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'This Is Not Such A Great Keyboard',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'keyboards',
          keywords: 'quality',
          preview: false,
          type: 1,
          cover_img: 'keyboard.png',
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Meh. Mediocre CPU',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'cpus',
          keywords: 'best',
          preview: false,
          type: 1,
          cover_img: 'cpu.gif',
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'What\'s the best gaming monitor under $200?',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'monitors',
          keywords: 'monitor, gaming monitor, best, under 200',
          preview: false,
          type: 3,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Should I but a mac or pc?',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'OS',
          keywords: 'mac, pc, compare, windows',
          preview: false,
          type: 3,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Is the Microsoft wireless 850 quiet?',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'keybords',
          keywords: 'keyboard, quiet',
          preview: false,
          type: 3,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Phillips LCD-243V5',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'monitors',
          keywords: 'monitor',
          cover_img: 'monitor1.png',
          preview: false,
          type: 2,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Acer G247HYL',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'monitors',
          keywords: 'monitor',
          cover_img: 'monitor2.png',
          preview: false,
          type: 2,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }
      ]);
    });
};

function seedAdditionalInfo() {
  console.log('Seeding additional info...');
  return knex('AdditionalInfo').del()
    .then(function () {
      return knex('AdditionalInfo').insert([
        {
          article_id: 7,
          pros: 'inexpensive, good resolution, nice view angles',
          cons: 'wobbly base, color saturation lacking, controls hard to work',
          specs: spec_data,
        },
        {
          article_id: 8,
          pros: 'just awesome, great resolution, perfect view angles',
          cons: 'wobbly base, controls are annoying',
          specs: spec_data,
        },
        {
          article_id: 6,
          answer: 'Depending on your definition of quiet. Yes it is.'
        },
        {
          article_id: 5,
          answer: 'Definitely get the mac...'
        },
        {
          article_id: 4,
          answer: 'The blah blah blah monitor is the best'
        }
      ]);
    });
}

function seedComments() {
  console.log('Seeding comments...');
  return knex('Comments').del()
    .then(function () {
      return knex('Comments').insert([
        {
          title: 'A Good Comment',
          content: 'Wow! Check out how great this comment is.',
          article_id: 1,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'A Better Comment',
          content: 'Wow! Check out how much better this comment is.',
          article_id: 1,
          user_id: 2,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'A Great Comment',
          content: 'Amazing! Check out how super awesomely great this comment is.',
          article_id: 1,
          user_id: 3,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'What Are You Talking About?',
          content: 'I\'m not sure you know what you\'re talking about.',
          article_id: 7,
          user_id: 3,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'I Think She Get\'s It',
          content: 'She totally get\'s the subject matter.',
          article_id: 7,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'This Is Awesome!',
          content: 'I can\'t belive I didn\'t know about this before!',
          article_id: 2,
          user_id: 2,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'This Review Sucks!',
          content: 'Worst review ever',
          article_id: 8,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Great Review!',
          content: 'This is a great review.',
          article_id: 8,
          user_id: 2,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Not Sure I get It?',
          content: 'Not sure what this review is saying. Shold I buy it or not?',
          article_id: 8,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Sounds Good!',
          content: 'This sounds like a very good buy.',
          article_id: 5,
          user_id: 3,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'What a strange question',
          content: 'This seems like a strange question.',
          article_id: 5,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Acer 5000',
          content: 'The Acer 5000 has been my go to monitor for years.',
          article_id: 4,
          user_id: 2,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'PC all the way!!!!',
          content: 'PC\'s are obviously the best for everything.',
          article_id: 5,
          user_id: 3,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Mac FTW!',
          content: 'Once you go mac you will never go back.',
          article_id: 5,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Not really sure.',
          content: 'It depends on what you are going to use it for.',
          article_id: 8,
          user_id: 2,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'I disagree.',
          content: 'I got one of these and it sounds like a herd of elephants walking in the room.',
          article_id: 6,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'I disagree.',
          content: 'This is not such a great comment',
          parent_comment_id: 1,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Your crazy!!',
          content: 'Still a great comment.',
          parent_comment_id: 1,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Hmm...',
          content: 'I thought it was a pretty good review.',
          parent_comment_id: 7,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Meh.',
          content: 'It\'s ok I guess',
          parent_comment_id: 1,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }
      ]);
    });
};

function seedImages() {
  console.log('Seeding images...');
  return knex('Images').del()
    .then(function () {
      return knex('Images').insert([
        {
          article_id: 1,
          file: 'monitor1.png'
        },
        {
          article_id: 2,
          file: 'monitor2.png'
        },
        {
          article_id: 3,
          file: 'monitor3.png'
        },
        {
          article_id: 7,
          file: 'monitor1.png'
        },
        {
          article_id: 8,
          file: 'monitor2.png'
        }
      ]);
    });
};
