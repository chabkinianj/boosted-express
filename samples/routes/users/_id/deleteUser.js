/**
 * @swagger
 * paths:
 *   /api/users/{id}:
 *     delete:
 *       tags:
 *       - "User"
 *       summary: "Delete a user by ID"
 *       description: "Deletes a user by their unique identifier."
 *       operationId: "deleteUserById"
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
 *           description: "User deleted successfully"
 *           schema:
 *             $ref: "#/definitions/DeleteUserResponse"
 *         404:
 *           description: "User not found"
 *           schema:
 *             $ref: "#/definitions/ErrorResponse"
 *
 * definitions:
 *   DeleteUserResponse:
 *     type: "object"
 *     properties:
 *       ok:
 *         type: "integer"
 *         description: "Operation status, 1 indicates success."
 *         example: 1
 *       deletedCount:
 *         type: "integer"
 *         description: "Number of documents deleted."
 *         example: 1
 *
 */
async function logic(req, res, next) {
    try {
        req.db.User.deleteOne({ _id: req.params.id }, (err, userRemoved) => {
            if (err) {
                res.status(500).send({ message: 'Error' });
            } else if (!userRemoved){
                res.status(404).send({ message: 'User not deleted' });
            } else {
                res.status(200).send(userRemoved);
            }
            next();
        });

    } catch (error) {
        next(error)
    }
};

module.exports = {
    operation: "delete",
    logic,
};