const jwt = require("jsonwebtoken");
const BlacklistedTokens = require("../model/tokenMod");
const userModel = require("../model/user");

const isLogedIn = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            const error = new Error("Please provide a token");
            error.statusCode = 403;
            throw error;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const isBlacklisted = await BlacklistedTokens.findOne({ token });
        if (isBlacklisted) {
            const error = new Error("Invalid or blacklisted token");
            error.statusCode = 403;
            throw error;
        }

        const user = await userModel.findOne({ email: decoded.email });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        req.user = user;
        next();
    } catch (err) {
        next(err); // pass the error to centralized handler
    }
};

module.exports = isLogedIn;
