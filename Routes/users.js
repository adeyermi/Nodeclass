const express = require("express")
const {addUser, getAllUsers,getAllUsersById, getAllUsersByIdAndDelete, updateUser, signIn, logOut} = require("../controllers/user3")
const isLognedIn = require("../middlewares/isLogedIn")
const isAdmin = require("../middlewares/isAdmin")

const userRouter = express.Router()

userRouter.route("/").post(addUser).get(getAllUsers)
userRouter.route("/sign-in").post(signIn)
userRouter.route("/logout").post(isLognedIn, logOut)

userRouter.route("/single/:id").get(  getAllUsersById).delete( isAdmin, getAllUsersByIdAndDelete).patch(updateUser)



module.exports = userRouter 