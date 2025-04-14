

const isAdmin = (req, res, next) => {
 
    if(req.user.role !== "admin"){
        return res.status(403).json({
            status: "error",
            message: "You have to be an admin to accces this route."
        })
    }

    next()
}

module.exports = isAdmin