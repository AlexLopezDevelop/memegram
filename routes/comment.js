const { getTotalUserComments, addComment, editComment, deleteComment, getAllCommentsByPost, getTotalCommentsPost } = require("./controllers/comment");
const { privateRoute } = require("../middlewares/privateRoute");
const commentSettings = require('express').Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *  name: Comment
 *  description: Comment management
 */

/**
 * @swagger
 * /comment/total/user:
 *  get:
 *    summary: Get total comments of user
 *    tags: [Comment]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: All comments of user
 *      404:
 *        description: User not have comments
 */
commentSettings.get("/total/user", getTotalUserComments)

/**
 * @swagger
 * /comment/add:
 *  post:
 *    summary: Add comment
 *    tags: [Comment]
 *    parameters:
 *      - in: path
 *        name: idUser
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *      - in: path
 *        name: idPost
 *        schema:
 *          type: number
 *        required: true
 *        description: The post id
 *      - in: path
 *        name: idComment
 *        schema:
 *          type: number
 *        required: true
 *        description: The comment id
 *      - in: path
 *        name: content
 *        schema:
 *          type: string
 *        required: true
 *        description: The comment content
 *    responses:
 *      200:
 *        description: Add comment
 *      404:
 *        description: Comment not added
 */
commentSettings.post("/add", privateRoute, addComment)

/**
 * @swagger
 * /comment/edit:
 *  post:
 *    summary: edit comment
 *    tags: [Comment]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The comment id
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *      - in: path
 *        name: contenido
 *        schema:
 *          type: string
 *        required: true
 *        description: The comment content
 *    responses:
 *      200:
 *        description: Edit comment
 *      404:
 *        description: Comment not edited
 */
commentSettings.post("/edit", privateRoute, editComment)

/**
 * @swagger
 * /comment/delete:
 *  delete:
 *    summary: Delete comment
 *    tags: [Comment]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: Delete comment
 *      404:
 *        description: Comment not deleted
 */
commentSettings.delete("/delete", privateRoute, deleteComment)

/**
 * @swagger
 * /comment/all:
 *  get:
 *    summary: Get all comments by post id
 *    tags: [Comment]
 *    parameters:
 *      - in: path
 *        name: idPost
 *        schema:
 *          type: number
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *        description: All comments by post id
 *      404:
 *        description: Post not have comments
 */
commentSettings.get("/all", getAllCommentsByPost)

/**
 * @swagger
 * /comment/total/post:
 *  get:
 *    summary: Get total comments by post id
 *    tags: [Comment]
 *    parameters:
 *      - in: path
 *        name: idPost
 *        schema:
 *          type: number
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *        description: Total comments by post id
 *      404:
 *        description: Post not have comments
 */
commentSettings.get("/total/post", getTotalCommentsPost)

module.exports = commentSettings;
