const express = require("express")
const {signup, getAllUsers,getUserById, getUserByIdAndDelete, updateUser, signIn, logOut, verifyEmail} = require("../controllers/user3")
const isLognedIn = require("../middlewares/isLogedIn")
const isAdmin = require("../middlewares/isAdmin")

const userRouter = express.Router()

userRouter.route("/").post(signup).get(getAllUsers)
userRouter.route("/sign-in").post(signIn)
userRouter.route("/logout").post(isLognedIn, logOut)
userRouter.route("/verify-email").post(verifyEmail); 

userRouter.route("/single/:id").get(  getUserById).delete( isAdmin, getUserByIdAndDelete).patch(updateUser)



module.exports = userRouter 