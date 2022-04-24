const { getAllPosts, getAllUserPosts, getPostById, getTotalUserPosts, addPost, editPost, deletePost } = require("./controllers/post");
const { privateRoute } = require("../middlewares/privateRoute");
const postSettings = require('express').Router({ mergeParams: true });

postSettings.get("/all", getAllPosts)
postSettings.get("/all/user", getAllUserPosts)
postSettings.get("/", getPostById)
postSettings.get("/total/user", getTotalUserPosts)
postSettings.post("/add", privateRoute, addPost)
postSettings.post("/edit", editPost)
postSettings.delete("/delete", deletePost)


module.exports = postSettings;
