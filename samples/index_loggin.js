
/// https://www.npmjs.com/package/bunyan

function modifiedStream() {
    return {
        write: log => {
            log.level = require('bunyan').nameFromLevel[log.level];
            var newLog = {
                level: log.level,
                time: log.time
            };
            delete log.name;
            delete log.hostname;
            delete log.pid;
            delete log.level;
            delete log.time;
            delete log.v;
            console.log(JSON.stringify(Object.assign(newLog, log)));
        }
    };
}

var options = {
    serverOptions: {
        scripts: "./routes/**/*.js",
        port: 8080
    },
    bunyanOptions: {
        name: "bunyanname",                 // Required, by default: "myapp"
        /*
        // By default, log output is to stdout and at the "info" level
        level: <level name or number>,      // Optional, see "Levels" section
        streams: [<bunyan streams>, ...],   // Optional, see "Streams" section
        serializers: <serializers mapping>, // Optional, see "Serializers" section
        src: <boolean>,                     // Optional, see "src" section 
        */
        
        //level: "debug",
        /*streams: [
            { level: 'info', stream: process.stdout },  // log INFO and above to stdout
            { level: 'error', path: 'myapp-error.log'}  // log ERROR and above to a file
        ],*/
        streams: [{ 
            level: 'info', 
            type: 'raw', 
            stream: modifiedStream()
        }]
    }
};

var solidApi = require('../boosted-express.js')(options);
solidApi.server.start();
