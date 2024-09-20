module.exports = (options) => {
    if (!options) 
        return {};

    options.bunyanOptions ??= {};
    options.bunyanOptions.name ??= 'myapp';
    
    let logger = require('bunyan').createLogger(options.bunyanOptions);
    let database = require('./app/createDatabase.js')(options.mongooseOptions, logger);
    let app = require('./app/createExpressApp.js')(options.serverOptions, options.swaggerOptions, database, logger);
    let server = require("http").createServer();

    server
        .on('request', app)
        .on('listening', function() {
            let addr = this.address();
            let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
            logger.info(`Listening on ${bind}`);
        })
        .on('error', function(error) {
            if (error.syscall !== 'listen') throw error;
            let addr = this.address() || { port: options.PORT };
            let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
            switch (error.code) {
                case 'EACCES':
                    logger.error(`${bind} requires elevated privileges`)
                    process.exit(1);
                case 'EADDRINUSE':
                    logger.error(`${bind} is already in use`)
                    process.exit(1);
                default:
                    throw error;
            }
        })
        .start = function() {
            if (options && options.serverOptions && options.serverOptions.port)
                this.listen(options.serverOptions.port);
        };
    
    return { logger, database, server };
};






        

    
