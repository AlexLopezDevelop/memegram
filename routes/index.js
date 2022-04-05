const memegramRouter = require('express').Router()
const UserRouter = require('./user')
const PostRouter = require('./post')
const CommentRouter = require('./comment')


memegramRouter.use("/user", UserRouter);
memegramRouter.use("/post", PostRouter);
memegramRouter.use("/comment", CommentRouter);

module.exports = memegramRouter;
