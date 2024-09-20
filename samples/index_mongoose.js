
var options = {
    mongooseOptions: {
        schemas: './schemas/**/*.js',
        connectionString: 'mongodb://127.0.0.1:27017/demo',
        /*connectionOptions: {
            poolSize: 5, 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        },*/
    },
    serverOptions: {
        scripts: "./routes/**/*.js",
        basepath: "/api",
        port: 8080
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
    bunyanOptions: {
        level: "debug",
    }
};
var solidApi = require('../boosted-express.js')(options);
solidApi.server.start();


