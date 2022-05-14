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
 * /user/{id}:
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
 *        description: User data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: success
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 1
 *                      description: The user id
 *                    name:
 *                      type: string
 *                      example: Alex Lopez
 *                      description: The user name
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: error
 *                data:
 *                  type: string
 *                  example: User not found
 */
userSettings.get("/", privateRoute, getUserById)

/**
 * @swagger
 * /user/all:
 *  get:
 *    summary: Get all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Returns all users
 *      404:
 *        description: No users found
 */
userSettings.get("/all", privateRoute, getAllUsers)

/**
 * @swagger
 * /user/add:
 *  post:
 *    summary: Add a new user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: nombre
 *        schema:
 *          type: string
 *        required: true
 *        description: The user name
 *      - in: path
 *        name: password
 *        schema:
 *          type: string
 *        required: true
 *        description: The user password
 *    responses:
 *      200:
 *        description: User added
 *      404:
 *        description: User not added
 */
userSettings.post("/add", addUser)

/**
 * @swagger
 * /user/edit:
 *  post:
 *    summary: Edit a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *      - in: path
 *        name: nombre
 *        schema:
 *          type: string
 *        required: true
 *        description: The user name
 *      - in: path
 *        name: password
 *        schema:
 *          type: string
 *        required: true
 *        description: The user password
 *    responses:
 *      200:
 *        description: User edited
 *      404:
 *        description: User not found
 */
userSettings.post("/edit", privateRoute, editUser)

/**
 * @swagger
 * /user/delete:
 *  delete:
 *    summary: Delete user by id
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
 *        description: User deleted
 *      404:
 *        description: User not found
 */
userSettings.delete("/delete", privateRoute, deleteUser)

/**
 * @swagger
 * /user/login:
 *  get:
 *    summary: Get login authentication
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: nombre
 *        schema:
 *          type: string
 *        required: true
 *        description: The user name
 *      - in: path
 *        name: password
 *        schema:
 *          type: string
 *        required: true
 *        description: The user password
 *    responses:
 *      200:
 *        description: Database response
 *      404:
 *        description: User not found
 */
userSettings.get("/login", loginUser)

module.exports = userSettings;
