const handleDuplicateError = (error) => {
    const errorKey = Object.keys(error.keyValue)[0];
    const errorVal = Object.values(error.keyValue)[0];
    const errorMessage = new Error(`${errorKey} of ${errorVal} already exists.`);
    const statusCode = 400;
    return { statusCode, errorMessage: errorMessage.message };
};

const errorHandler = (err, req, res, next) => {
    console.log("Error caught:", err);

    // Duplicate key error
    if (err.code === 11000) {
        const error = handleDuplicateError(err);
        return res.status(error.statusCode).json({ message: error.errorMessage });
    }

    // Validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }

    // Cast error 
    if (err.name === "CastError") {
        return res.status(400).json({ message: `invalid ${err.path}: ${err.value}` });
    }

    // Invalid token
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
    }

    //  Expired token
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
    }


    res.status(err.statusCode || 500).json({
        message: err.message || "An unknown error occurred.",
    });
};

module.exports = errorHandler;
