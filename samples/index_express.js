var options = {
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
            }
        },
        urlpath: '/docs'
    },
    bunyanOptions: {
        level: "debug",
    }
};
var solidApi = require('../boosted-express.js')(options);
solidApi.server.start();

