const moment = require('moment');
const knex = require('../../utils/db');

exports.seed = function(knex, Promise) {
  return seedUsers()
    .then(function() {
      return seedPosts()
    })
    .then(function() {
      return seedReviews()
    })
    .then(function() {
      return seedComments()
    })
    .then(function() {
      return seedImages()
    });
};

function seedUsers() {
  console.log('Seeding users...');
  return knex('Users').del()
    .then(function () {
      return knex('Users').insert([
        {email: 're@incubo.ca', username: 'Nibor', password: '$2a$10$q6TjuJWtfZDAj4E7I9Ngx.XvmkUG5jzZR/M4fpUOWjrbV0lQplCWa'},
        {email: 'jess@test.com', username: 'Twiggie', password: '$2a$10$q6TjuJWtfZDAj4E7I9Ngx.XvmkUG5jzZR/M4fpUOWjrbV0lQplCWa'},
        {email: 'hey@example.com', username: 'Big Daddy', password: '$2a$10$q6TjuJWtfZDAj4E7I9Ngx.XvmkUG5jzZR/M4fpUOWjrbV0lQplCWa'},
      ]);
    });
};

function seedPosts() {
  console.log('Seeding posts...');
  return knex('Posts').del()
    .then(function () {
      return knex('Posts').insert([
        {
          title: 'This Monitor Rocks',
          content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolorum sapiente inventore repellendus explicabo dolore consequatur nesciunt ex repellat corrupti
          laudantium. Ad fuga, voluptas ducimus libero, exercitationem sunt temporibus voluptate vel! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis mollitia, magnam, quod aperiam
          sapiente inventore illum distinctio veniam nemo dolorum vero nisi maiores laudantium porro ipsam
          facere? Maiores, debitis.`,
          category: 'monitors',
          keywords: 'monitor',
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
          keywords: 'keyboard',
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
          keywords: 'cpu',
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
      ]);
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
            "Warranty_Labor": "36 months"
          });

function seedReviews() {
  console.log('Seeding reviews...');
  return knex('Reviews').del()
    .then(function() {
      return knex('Reviews').insert([
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
          pros: 'inexpensive, good resolution, nice view angles',
          cons: 'wobbly base, color saturation lacking, controls hard to work',
          specs: spec_data,
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
          pros: 'just awesome, great resolution, perfect view angles',
          cons: 'wobbly base, controls are annoying',
          specs: spec_data,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
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
          post_id: 1,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'A Better Comment',
          content: 'Wow! Check out how much better this comment is.',
          post_id: 1,
          user_id: 2,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'A Great Comment',
          content: 'Amazing! Check out how super awesomely great this comment is.',
          post_id: 1,
          user_id: 3,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'What Are You Talking About?',
          content: 'I\'m not sure you know what you\'re talking about.',
          post_id: 2,
          user_id: 3,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'I Think She Get\'s It',
          content: 'She totally get\'s the subject matter.',
          post_id: 2,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'This This Is Awesome!',
          content: 'I can\'t belive I didn\'t know about this before!' ,
          post_id: 3,
          user_id: 2,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'This Review Sucks!',
          content: 'Worst review ever',
          review_id: 1,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Great Review!',
          content: 'This is a great review.' ,
          review_id: 1,
          user_id: 2,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Not Sure I get It?',
          content: 'Not sure what this review is saying. Shold I buy it or not?',
          review_id: 2,
          user_id: 1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: 'Sounds Good!',
          content: 'This sounds like a very good buy.' ,
          review_id: 2,
          user_id: 3,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }
      ]);
    });
};

function seedImages() {
  console.log('Seeding images...');
  return knex('Images').del()
    .then(function() {
      return knex('Images').insert([
        {
          post_id: 1,
          file: 'img1.jpg'
        },
        {
          review_id: 1,
          file: 'img4.png'
        },
        {
          post_id: 2,
          file: 'img6.jpg'
        },
        {
          review_id: 2,
          file: 'img8.jpg'
        }
      ]);
    });
};
