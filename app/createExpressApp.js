const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = (options, swaggerOptions, database, logger) => {
    if (!options || !options.scripts) {
        if (logger) logger.info(`No script root directory specified`);
        return express();
    }
    options.basepath = options.basepath ? options.basepath : '';

    const router = require('./createRouter.js')(options.scripts, logger);
    var app = express();

    if (swaggerOptions) {
        let scriptspath = process.cwd() + options.scripts.replace('.', '');
        const swaggerDocs = swaggerJsDoc({
            swaggerDefinition: {
                info: swaggerOptions.info
            },
            apis: [scriptspath]
        });
        const swaggetPath = swaggerOptions.urlpath? swaggerOptions.urlpath : '/api-docs'
        app.use(swaggetPath, swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    }
    
    if (options.pre_middlewares && options.pre_middlewares.constructor === Array)
        options.pre_middlewares.forEach(middlewareFuncion => app.use(middlewareFuncion));
    else if (options.pre_middlewares)
        app.use(options.pre_middlewares)
    
    app.use(bodyParser.urlencoded({ extended: true }))
        .use(bodyParser.json())
        .use(async (req, res, next) => {
            logger.debug(`${req.method} request to ${req.url}`);
            req.base = `${req.protocol}://${req.get('host')}`;
            req.logger = logger;
            req.db = database;
            return next();
        })
        .use((error, req, res, next) => {
            if (logger) logger.error(error, error);
            res.status(error.status || 500).json({ error });
        })
        .use(options.basepath, router)
        .use(async (req, res, next) => { 
            logger.info(`${res.statusCode} ${req.method} ${req.url}`);
            return next();
        });  

    if (options.post_middlewares && options.post_middlewares.constructor === Array)
        options.post_middlewares.forEach(middlewareFuncion => app.use(middlewareFuncion));
    else if (options.post_middlewares)
        app.use(options.post_middlewares)
    
    if (options.static && options.static.root) {
        let basepath = options.static.basepath? options.static.basepath : '';
        app.use(basepath, express.static(options.static.root, options.static.options));
        logger.debug(`Static content from ${options.static.root} served on ${basepath}`);
    }
    
    return app;
};
