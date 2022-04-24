const { getAllUsers, getUserById, addUser, editUser, deleteUser, loginUser } = require("./controllers/user");
const { privateRoute } = require("../middlewares/privateRoute");
const userSettings = require('express').Router({ mergeParams: true });

userSettings.get("/all", privateRoute, getAllUsers)
userSettings.get("/", privateRoute, getUserById)
userSettings.post("/add", addUser)
userSettings.post("/edit", editUser)
userSettings.delete("/delete", deleteUser)
userSettings.get("/login", loginUser)

module.exports = userSettings;
