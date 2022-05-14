const { getAllPosts, getAllUserPosts, getPostById, getTotalUserPosts, addPost, editPost, deletePost } = require("./controllers/post");
const { privateRoute } = require("../middlewares/privateRoute");
const postSettings = require('express').Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Posts management
 */

/**
 * @swagger
 * /post/all:
 *  get:
 *    summary: Get all posts
 *    tags: [Post]
 *    responses:
 *      200:
 *        description: Returns all posts
 *      404:
 *        description: No posts found
 */
postSettings.get("/all", getAllPosts)

/**
 * @swagger
 * /post/all/user:
 *  get:
 *    summary: Get all user posts by user id
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: All user posts
 *      404:
 *        description: User not found
 */
postSettings.get("/all/user", getAllUserPosts)

/**
 * @swagger
 * /post/{id}:
 *  get:
 *    summary: Get post by id
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *        description: The post
 *      404:
 *        description: Post not found
 */
postSettings.get("/", getPostById)

/**
 * @swagger
 * /post/total/user:
 *  get:
 *    summary: Get total user posts
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: The total user posts
 *      404:
 *        description: No posts found
 */
postSettings.get("/total/user", getTotalUserPosts)

/**
 * @swagger
 * /post/add:
 *  post:
 *    summary: Add a new post
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *      - in: path
 *        name: UIDimage
 *        schema:
 *          type: string
 *        required: true
 *        description: The post UID image
 *    responses:
 *      200:
 *        description: The added post
 *      404:
 *        description: Error adding post
 */
postSettings.post("/add", privateRoute, addPost)

/**
 * @swagger
 * /post/edit:
 *  post:
 *    summary: Edit a post
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The post id
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *      - in: path
 *        name: UIDimage
 *        schema:
 *          type: string
 *         required: true
 *         description: The post UID image
 *    responses:
 *      200:
 *        description: Post edited
 *      404:
 *        description: Post not found
 */
postSettings.post("/edit", privateRoute, editPost)

/**
 * @swagger
 * /post/delete:
 *  delete:
 *    summary: Delete a post
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *        description: Post deleted
 *      404:
 *        description: Post not found
 */
postSettings.delete("/delete", privateRoute, deletePost)


module.exports = postSettings;
