/**
 * @swagger
 * paths:
 *   /api/users:
 *     get:
 *       tags:
 *       - "User"
 *       summary: "Retrieve a list of users"
 *       description: "Returns a list of all users."
 *       operationId: "getUsers"
 *       produces:
 *       - "application/json"
 *       responses:
 *         200:
 *           description: "A list of users"
 *           schema:
 *             type: "array"
 *             items:
 *               $ref: "#/definitions/UserResponse"
 *         500:
 *           description: "Internal server error"
 *           schema:
 *             $ref: "#/definitions/ErrorResponse"
 *
 * definitions:
 *   UserResponse:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: "string"
 *         description: "The unique identifier of the user."
 *         example: "66e1d46dcb848033bc9fb232"
 *       name:
 *         type: "string"
 *         description: "The name of the user."
 *         example: "John Doe"
 *       document:
 *         type: "string"
 *         description: "The document number of the user."
 *         example: "1.100.100-2"
 *       __v:
 *         type: "integer"
 *         description: "Version key for internal versioning."
 *         example: 0
 *
 */
async function logic(req, res, next) {
    try {
        var userList = await req.db.User.find();
        res.status(200).send(userList);
        
        next();
    } catch(error) {
        res.status(400).send("Error fatal");
    }
};

module.exports = {
    operation: 'get',
    logic
}
