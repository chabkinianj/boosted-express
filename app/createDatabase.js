
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');

module.exports = (options, logger) => {
    if (!options || !options.connectionString) {
        if (logger) logger.info(`Mongodb connection string not specified`);
        return {};
    } 
    options.connectionOptions ??= {};
    options.connectionOptions.poolSize ??= 5;
    options.connectionOptions.useNewUrlParser ??= true;
    options.connectionOptions.useUnifiedTopology ??= true;

    let schemaspath = process.cwd() + options.schemas.replace('.', '');
    if (logger) logger.debug(`Searching for mongoose schemes in: ${schemaspath}`);
    let filepath = '';

    let db = glob.sync(options.schemas, { cwd: process.cwd() })
        .map(filename => {
            filepath = process.cwd() + filename.replace('.', '');
            if (logger) logger.debug(` - Loading schema in: ${filepath}`);
            return {
                schema: require(filepath), 
                name: path
                    .basename(filename)
                    .replace(path.extname(filename), ''),
            }
        })
        .map(({name, schema}) => mongoose.model(name, schema))
        .reduce((db, model) => {
            return {
                ...db,
                [model.modelName]: model,
            }
        }, {});

    mongoose.connect(options.connectionString, options.connectionOptions);
    mongoose.connection
        .on('error', error => {
            throw error
        })
        .once('open', () => {
            if (logger) logger.info(`MongoDB connected at ${options.connectionString}`);
        });
    
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            if (logger) logger.info(`MongoDB disconnected on app termination`);
            process.exit(0);
        });
    });
    
    return db;
}
