/**
 * @swagger
 * paths:
 *   /api/users/{id}:
 *     get:
 *       tags:
 *       - "User"
 *       summary: "Retrieve a user by ID"
 *       description: "Returns a user by their unique identifier."
 *       operationId: "getUserById"
 *       produces:
 *       - "application/json"
 *       parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "The unique identifier of the user."
 *         required: true
 *         type: "string"
 *         example: "66e1daf3c4ffbc519c235771"
 *       responses:
 *         200:
 *           description: "User found"
 *           schema:
 *             $ref: "#/definitions/UserDetailResponse"
 *         404:
 *           description: "User not found"
 *           schema:
 *             $ref: "#/definitions/ErrorResponse"
 *
 * definitions:
 *   UserDetailResponse:
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
 */
async function logic(req, res, next) {
    try {
        var userId = req.params.id;
        req.db.User.findById(userId, (err, user) => {
            if (err) {
                res.status(500).send({ message: 'Error'});
            } else if (!user) {
                res.status(404).send({ message: 'User not found'});
            } else {
                res.status(200).send({ user: user });
            }
            next();
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    operation: 'get',
    logic
}
