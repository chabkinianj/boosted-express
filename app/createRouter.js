
const glob = require('glob');
const Router = require('express').Router;
const global = require('./appsettings');

module.exports = (scriptspath, logger) => { 
    logger.debug(`Searching for scripts in: ${scriptspath}`);

    let routes = [], fullFileName = '', path = '', filePath = '', reqModule;    
    let filePathReplace = scriptspath.substring(0, scriptspath.indexOf('/*'));
    let jsFiles = glob.sync(scriptspath, { cwd: process.cwd() });
    
    jsFiles.forEach((file) => {
        fullFileName = file.replace(filePathReplace, '');
        path = fullFileName
            .substring(0, fullFileName.lastIndexOf("/"))
            .replace(/_/g, ':');

        filePath = process.cwd() + file.replace('.', '');
        logger.debug(` - Loading script: ${filePath}`);

        reqModule = require(`${filePath}`);
        if (reqModule.hasOwnProperty('operation') && global.IsAnHttpOperation(reqModule.operation)) {
            routes.push(Router({mergeParams: true})[reqModule.operation](path, reqModule.logic));
            logger.debug(` - ${reqModule.operation} ${path} successfully added`);
        }
        else 
            logger.error(`The module ${fullFileName} did not export an object with a valid 'operation' property`);
    });
    return routes.reduce((rootRouter, router) => rootRouter.use(router), Router({ mergeParams: true }));
};
    

