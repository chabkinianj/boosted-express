const global = {
    httpOperations: { 
        GET:'get', 
        POST:'post', 
        PUT:'put', 
        PATCH:'patch', 
        DELETE:'delete', 
        COPY:'copy', 
        HEAD:'head', 
        OPTIONS:'options', 
        PURGE:'purge', 
        LOCK:'lock', 
        UNLOCK:'unlock', 
        PROPFIND:'propfind'
    },
    IsAnHttpOperation: function(operation) {
        return this.httpOperations[operation] !== 'undefined';
    },
}

module.exports = global;