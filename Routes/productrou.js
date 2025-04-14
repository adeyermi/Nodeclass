const express = require("express")


const {addProduct} = require("../controllers/productcon")
const isLogedIn = require("../middlewares/isLogedIn")
const isAdmin = require("../middlewares/isAdmin")

const productRouter = express.Router()

productRouter.route("/").post(isLogedIn, isAdmin, addProduct)





module.exports = productRouter