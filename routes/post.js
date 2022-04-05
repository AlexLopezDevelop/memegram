const { getAllPosts, getAllUserPosts, getPostById, getTotalUserPosts, addPost, editPost, deletePost } = require("./controllers/post");
const postSettings = require('express').Router({ mergeParams: true });

postSettings.get("/all", getAllPosts)
postSettings.get("/all/user", getAllUserPosts)
postSettings.get("/", getPostById)
postSettings.get("/total/user", getTotalUserPosts)
postSettings.post("/add", addPost)
postSettings.post("/edit", editPost)
postSettings.delete("/delete", deletePost)


module.exports = postSettings;
