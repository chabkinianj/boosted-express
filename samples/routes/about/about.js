/**
* @swagger
* /api/about:
*  get:
*      description: returns API information
*      responses:
*          '200':
*              description: ok
*/
async function logic(req, res, next) {
    req.logger.info("info message");
    req.logger.info({ location:'/routes/about', desc:'info message' });
    req.logger.error({ location:'/routes/about', desc:'error message', exception: 'exeption detail' });
    
    res.status(200).send({ 
        verion: 1,
        name: "solid-express demo"
    });
    //res.status(400).send('error');
    
    next();
};

module.exports = {
    operation: 'get',
    logic
}
