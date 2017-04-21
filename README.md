# Jess' Blog

### create a mySQL database

### create file server/config/config.json with the following values

    "DB_HOST": "127.0.0.1"

    "DB_USER": {Your DB username}

    "DB_PASS": {Your DB password}

    "DB_NAME": {Your DB name}

    "JWT_SECRET": {any random string}

    "MAIL_PASS": {Your gmail password}

    "MAIL_USER": {Your gmail username}

### create file client/config/config.json with the following values

    "ROOT_URL": "http://localhost:3001"

    "ADMIN_USER": "Admin"

### From jess-blog/server run the following commands

    npm run knex:migrate

then

    npm run knex:seed

then

    npm run server

The server should now be running on port 3001.

### From jess-blog/client run the following commands

    npm run dev

Webpack dev server should now be running on localhost:8080

#### All user passwords are 123

You may sign in from any article's comment section

Signing in as admin allows article creation, editing and deletion from admin page (navbar right)