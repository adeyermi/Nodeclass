const jwt = require("jsonwebtoken")
const BlacklistedTokens = require("../model/tokenMod");
const userModel = require("../model/user");
const crypto = require("crypto")


const isLogedIn = async (req, res, next) => {
    let token;
    // check if there's a token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        res.status(403).json({
            status: "error",
            message: "Please provide a token"
        })
        return
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.jwt_secret)

    // ensure it's not blacklisted
    const isBlacklisted = await BlacklistedTokens.findOne({token})
    if(isBlacklisted){
        res.status(403).json({
            status: "error",
            message: "Invalid token"
        })
        return
    }

    // find the user who owns the token using the email or id
    const {email} = decoded
    const user = await userModel.findOne({email})
    req.user = user

    next()
}

module.exports = isLogedIn
