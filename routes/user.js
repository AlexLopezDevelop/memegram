const { getAllUsers, getUserById, addUser, editUser, deleteUser } = require("./controllers/user");
const userSettings = require('express').Router({ mergeParams: true });

userSettings.get("/all", getAllUsers)
userSettings.get("/", getUserById)
userSettings.post("/add", addUser)
userSettings.post("/edit", editUser)
userSettings.delete("/delete", deleteUser)

module.exports = userSettings;
