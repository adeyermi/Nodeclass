const cloudinary = require("cloudinary").v2
const dotenv = require("dotenv")
cloudinary.config({
    CLOUDNAME: process.env.CLOUDNAME,
    APIKEY: process.env.APIKEY,
    APISECRET: process.env.APISECRET
})

module.exports =cloudinary