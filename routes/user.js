const { getAllUsers, getUserById, addUser, editUser, deleteUser, loginUser } = require("./controllers/user");
const { privateRoute } = require("../middlewares/privateRoute");
const userSettings = require('express').Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 */

/**
 * @swagger
 * /{id}:
 *  get:
 *    summary: Get user by id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: Database response
 *      404:
 *        description: User not found
 */
userSettings.get("/", privateRoute, getUserById)

/**
 * @swagger
 * /all:
 *  get:
 *    description: Get all users
 *    tags: [User]
 *    responses:
 *      '200':
 *        description: A successful response
 */
userSettings.get("/all", privateRoute, getAllUsers)
userSettings.post("/add", addUser)
userSettings.post("/edit", privateRoute, editUser)
userSettings.delete("/delete", privateRoute, deleteUser)
userSettings.get("/login", loginUser)

module.exports = userSettings;
