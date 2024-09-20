/**
 * @swagger
 * paths:
 *   /api/users/{id}:
 *     put:
 *       tags:
 *       - "User"
 *       summary: "Update a user by ID"
 *       description: "Updates the details of an existing user by their unique identifier."
 *       operationId: "updateUserById"
 *       consumes:
 *       - "application/json"
 *       produces:
 *       - "application/json"
 *       parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "The unique identifier of the user."
 *         required: true
 *         type: "string"
 *         example: "66e1daf3c4ffbc519c235771"
 *       - in: "body"
 *         name: "body"
 *         description: "Object containing the updated user details."
 *         required: true
 *         schema:
 *           $ref: "#/definitions/UserUpdateRequest"
 *       responses:
 *         200:
 *           description: "User updated successfully"
 *           schema:
 *             $ref: "#/definitions/UserDetailResponse"
 *         400:
 *           description: "Invalid input"
 *           schema:
 *             $ref: "#/definitions/ErrorResponse"
 *         404:
 *           description: "User not found"
 *           schema:
 *             $ref: "#/definitions/ErrorResponse"
 *
 * definitions:
 *   UserUpdateRequest:
 *     type: "object"
 *     properties:
 *       name:
 *         type: "string"
 *         description: "The updated name of the user."
 *         example: "Luis Suarez"
 *       document:
 *         type: "string"
 *         description: "The updated document number of the user."
 *         example: "2.111.222-2"
 *
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
 *             description: "The updated name of the user."
 *             example: "Luis Suarez"
 *           document:
 *             type: "string"
 *             description: "The updated document number of the user."
 *             example: "2.111.222-2"
 *           __v:
 *             type: "integer"
 *             description: "Version key for internal versioning."
 *             example: 0
 *
 */
async function logic(req, res, next) {
    try {
        var userId = req.params.id;
        var update = req.body;

        req.db.User.findByIdAndUpdate(userId, update, {new: true, useFindAndModify: false}, (err, userUpdated) => {
            if (err) {
                res.status(500).send({ message: 'Error' });
            } else if (!userUpdated){
                res.status(404).send({ message: 'User not saved' });
            } else {
                res.status(200).send({ user: userUpdated });
            }
            next();
        });
    } catch(error) {
        next(error);
    }
};

module.exports = {
    operation: "put",
    logic,
};