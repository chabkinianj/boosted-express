# boosted-express

[![npm version](https://img.shields.io/npm/v/boosted-express.svg)](https://www.npmjs.com/package/boosted-express)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**boosted-express** is an npm package designed to simplify and accelerate API development in Node.js, based on SOLID principles. This package was inspired by Carlos Illobre's article on implementing APIs using SOLID in Node.js, and has been extended to offer a powerful tool for building robust and maintainable APIs.

## Features

- **Automatic Route Inference**: Infers API routes based on your project's folder and file structure, eliminating the need to manually define routes in a routing file.
- **SOLID Principles**: Promotes adherence to SOLID principles, especially Single Responsibility and Open/Closed.
- **Swagger Integration**: Automatically generates API documentation using Swagger.
- **Bunyan Logger**: Provides access to the Bunyan logger in all API functions.
- **Mongoose Integration**: Easy access to Mongoose schemas through package configuration, allowing direct interaction with MongoDB in your routes.

## Key Concepts from the Original Article

1. **Folder Structure as API Definition**: The package uses your folder structure to define your API routes, promoting a clear and intuitive organization of your codebase.

2. **Single Responsibility Principle**: Each file represents a single API endpoint, ensuring that each piece of code has one and only one reason to change.

3. **Open/Closed Principle**: The system is open for extension (you can add new routes by adding new files) but closed for modification (existing routes don't need to be changed to add new ones).

4. **Dependency Inversion**: The package handles the routing logic, allowing you to focus on writing the business logic for each endpoint.

5. **Separation of Concerns**: By separating route definition (folder structure) from route implementation (file contents), the package promotes a clean separation of concerns.

## Installation

Install the package using npm:

```bash
npm install boosted-express
```

## Project Structure

boosted-express infers your API routes based on your project's folder structure. Here's an example:

```
index.js
/routes
    /user
        addUser.js
        getUsers.js
        /_id
            deleteUser.js
            updateUser.js
```

Each .js file should export an object with two properties:

```javascript
module.exports = {
    operation: 'post',  // endpoint HTTP verb
    logic: async (req, res, next) => {
        // Your API logic here
    }
};
```

This structure will automatically generate the following routes:

- `POST /api/user`: Invokes the 'logic' function exported by addUser.js
- `GET /api/user`: Invokes the 'logic' function exported by getUsers.js
- `DELETE /api/user/:id`: Invokes the 'logic' function exported by deleteUser.js
- `PUT /api/user/:id`: Invokes the 'logic' function exported by updateUser.js

## Usage

To use boosted-express in your project, set up your folder structure as described above, and the package will handle route inference and management automatically. Here's a example:

```javascript
const expressBoost = require('boosted-express');

const { logger, database, server } = expressBoost({
    serverOptions: {
        scripts: "./routes/**/*.js",
        basepath: "/api",
        preMiddlewares: [],
        postMiddlewares: [],
        port: 8080,
        static: {
            basepath: '/st',
            root: './content',
            options: { maxAge: '1y' }
        }
    },
    swaggerOptions: {
        info: { 
            title: 'Demo API',
            description: 'Demo API Description',
            contact: {
                name: 'DAPI'
            },
        },
        urlpath: '/docs'
    },
    mongooseOptions: {
        schemas: './schemas/**/*.js',
        connectionString: 'mongodb://localhost:27017/demo',
        connectionOptions: {
            poolSize: 100, 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    },
    bunyanOptions: {
        name: "boosted-express-demo",
        level: "debug",
    }
});

server.start();
```

## Configuration Options

### serverOptions

- `scripts`: Expression determining the location of API function scripts.
  Example: `"./routes/**/*.js"` will search for .js files within the 'routes' folder in the root of your project.

- `basepath`: Base path for the API.
  For example, if the basepath is set to "myapi", and using the file structure from the example above, solid-express will infer that the route for addUser.js is "/myapi/user".

- `preMiddlewares`: Express middlewares executed before the API route handler.
  You can use any middleware compatible with Express. For example, to use express-xml-bodyparser:

  ```javascript
  const xmlparser = require('express-xml-bodyparser');
  const xmlParserInstance = xmlparser({ normalizeTags: false });

  const options = {
    serverOptions: {
      // ...
      preMiddlewares: [xmlParserInstance],
      // ...
    },
    // ...
  };

  const solidApi = require('solid-express')(options);
  ```

- `postMiddlewares`: Express middlewares executed after the API route handler.
  These function similarly to the preMiddlewares property.

- `port`: Server port.

- `static`: Configuration for serving static content.
  For example, if you have a 'content' folder in your project root containing an index.html file, you can serve it at "http://localhost:8080/st/index.html" with the following configuration:

  ```javascript
  const options = {
    serverOptions: {
      // ...
      static: {
        basepath: '/st',
        root: './content',
        options: { maxAge: '1y' }
      }
      // ...
    },
    // ...
  };

  const solidApi = require('solid-express')(options);
  solidApi.server.listen(8080);
  ```

  For all available options, refer to: [Express Static Middleware Documentation](https://expressjs.com/en/api.html#express.static)

### swaggerOptions

- `info`: Swagger information (title, description, contact, etc.)
  For all available options for the info property, see: [swagger-jsdoc npm package](https://www.npmjs.com/package/swagger-jsdoc)

- `urlpath`: Base path for the auto-generated Swagger documentation site.
  Example: If set to '/docs', the documentation will be available at "http://localhost:8080/docs"

### mongooseOptions

- `schemas`: Expression determining the location of Mongoose schemas.
  Example: `"./schemas/**/*.js"` will search for .js files within the 'schemas' folder in the root of your project.

- `connectionString`: MongoDB connection string.

- `connectionOptions`: Mongoose connection options.
  For all available Mongoose connection options, see: [Mongoose Connection Options](https://mongoosejs.com/docs/connections.html#connection-string-options)

### bunyanOptions

All configurable options for Bunyan can be found in the Bunyan documentation: [Bunyan npm package](https://www.npmjs.com/package/bunyan#constructor-api)

## Using Mongoose Connection and Logger

solid-express injects the Mongoose connection with all defined schemas loaded, and the logger, through middlewares. This makes it easy to access your database models and logging functionality in your route handlers.

Let's look at an example to clarify:

### Defining a Mongoose Schema

First, define your Mongoose schema. For example, in `./schemas/User.js`:

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    document: String,
});

module.exports = UserSchema;
```

### Using the Schema in a Route Handler

Now, let's use this schema in a route handler. For example, in `./routes/users/addUser.js`:

```javascript
module.exports = {
    operation: 'post',
    logic: async (req, res, next) => {
        try {
            if (!req.body.document || !req.body.name) {
                return res.status(400).send({ error: 'name & document properties are required' });
            }

            const newUser = new req.db.User({ 
                name: req.body.name,
                document: req.body.document
            });

            newUser.save((err, userStored) => {
                if (err) {
                    res.status(500).send({ message: 'Error on saving' });
                } else if (!userStored) {
                    res.status(404).send({ message: 'User not saved' });
                } else {
                    res.status(200).send({ user: userStored });
                }
                next(); // Call next() to pass control to the next middleware
            });
        } catch (error) {
            req.logger.error('Caught error in addUser', error);
            res.status(500).send({ error: 'Internal server error' });
            next(error); // Pass the error to the next error-handling middleware
        }
    }
};
```

### Key Points

1. **Mongoose Connection**: The Mongoose connection is available via `req.db`. In the example, we access the User model with `req.db.User`.

2. **Logger**: The Bunyan logger is accessible via `req.logger`. Use it to log messages at different levels (e.g., `req.logger.info()`, `req.logger.error()`).

3. **Error Handling**: Always wrap your logic in a try-catch block to handle unexpected errors. Use the logger to record these errors for debugging.

4. **Response Handling**: Ensure you send appropriate HTTP status codes and meaningful messages in your responses.

5. **Middleware Flow**: Always call `next()` at the end of your middleware function to ensure the request is passed to the next middleware in the chain. In case of errors, pass the error to `next(error)` to trigger error-handling middleware.

## Contributing

Contributions are welcome! If you find a bug, need an extension, or have an improvement idea, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License.

## Acknowledgements

This project was inspired by Carlos Illobre's article ["Node.js & Express: How to Organize Your Routes in Very Big Applications (and Why Controllers are Evil)"](https://medium.com/@carlos.illobre/nodejs-express-how-to-organize-your-routes-in-very-big-applications-and-why-controllers-are-evil-e202eea497f4). We extend our gratitude to Carlos for sharing his insights on applying SOLID principles to Node.js API development.

Special thanks to Fernando Ron for introducing us to this article and initiating the development of this utility package.
