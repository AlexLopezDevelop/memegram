const { getTotalUserComments, addComment, editComment, deleteComment, getAllCommentsByPost, getTotalCommentsPost } = require("./controllers/comment");
const { privateRoute } = require("../middlewares/privateRoute");
const commentSettings = require('express').Router({ mergeParams: true });

commentSettings.get("/total/user", getTotalUserComments)
commentSettings.post("/add", privateRoute, addComment)
commentSettings.post("/edit", privateRoute, editComment)
commentSettings.delete("/delete", privateRoute, deleteComment)
commentSettings.get("/all", getAllCommentsByPost)
commentSettings.get("/total/post", getTotalCommentsPost)

module.exports = commentSettings;
