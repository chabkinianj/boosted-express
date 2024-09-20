/**
 * @swagger
 * paths:
 *   /api/users:
 *     post:
 *       tags:
 *       - "User"
 *       summary: "Create a new user"
 *       description: "Creates a new user with a name and document number."
 *       operationId: "createUser"
 *       consumes:
 *       - "application/json"
 *       produces:
 *       - "application/json"
 *       parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "Object containing the user's details."
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
 *       responses:
 *         200:
 *           description: "User created successfully"
 *           schema:
 *             $ref: "#/definitions/UserResponse"
 *         400:
 *           description: "Invalid input"
 *           schema:
 *             $ref: "#/definitions/ErrorResponse"
 *
 * definitions:
 *   User:
 *     type: "object"
 *     required:
 *     - "name"
 *     - "document"
 *     properties:
 *       name:
 *         type: "string"
 *         description: "The name of the user."
 *         example: "Luis Suarez"
 *       document:
 *         type: "string"
 *         description: "The document number of the user."
 *         example: "2.111.222-1"
 *
 *   UserResponse:
 *     type: "object"
 *     properties:
 *       user:
 *         type: "object"
 *         properties:
 *           _id:
 *             type: "string"
 *             description: "The unique identifier of the user."
 *             example: "66e1daf3c4ffbc519c235771"
 *           name:
 *             type: "string"
 *             description: "The name of the user."
 *             example: "Luis Suarez"
 *           document:
 *             type: "string"
 *             description: "The document number of the user."
 *             example: "2.111.222-1"
 *           __v:
 *             type: "integer"
 *             description: "Version key for internal versioning."
 *             example: 0
 *
 *   ErrorResponse:
 *     type: "object"
 *     properties:
 *       code:
 *         type: "string"
 *         description: "Error code."
 *         example: "400"
 *       message:
 *         type: "string"
 *         description: "Description of the error."
 *         example: "Invalid input data."
 */

async function logic(req, res, next) {
    try {
        if (!req.body.document || !req.body.name)
            return res.status(400).send({ error: 'id & document properties are required' } );

        var newUser = { 
            name: req.body.name,
            document: req.body.document
        }
        
        newUser = new req.db.User(newUser);
        newUser.save((err, userStored) => {
            if (err) {
                res.status(500).send({ message: 'Error on saving' });
            } else if (!userStored) {
                res.status(404).send({ message: 'User not saved' });
            } else {
                res.status(200).send({ user: userStored });
            }
            next();
        });

    } catch (error) {
        req.logger.error('Catched error on addUser', error);
        res.status(400).send({ error: error });
    }
};

module.exports = {
    operation: 'post',
    logic
}
