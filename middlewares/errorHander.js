const handleDuplicateError = (error)=>{
    const errorKey = Object.keys(error.keyValue)[0]
    const errorVal = Object.values(error.keyValue)[0]
    const errorMessage = new Error(`${errorKey} of ${errorVal} already exists.`)
    const statusCode = 400
    return {
        statusCode,
        errorMessage: errorMessage.message
    }
}

const errorHandler = (err, req, res, next)=>{
    console.log(err);
    
    // duplicate error
    if(err.code === 11000){
        const error = handleDuplicateError(err)
        res.status(error.statusCode).json({
            message: error.errorMessage
        })
    } 
    // validation error
    else if(err.name === "ValidationError"){

    } else if(err.name === "CastError"){

    }
     else{
        res.status(500).json({
            message: "An error occurred!"
        })
    }
    
}

module.exports = errorHandler