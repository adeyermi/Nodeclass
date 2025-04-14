const productModel = require("../model/productmod");


async function addProduct(req, res) {
    console.log(req.user)
    try {
        const product = await productModel.create(req.body)

        if (!product) {
            res.status(400).json({
               status: "error",
               message: "products not created",
               product
            })
               
           } else {
               res.status(201).json({
                   status: "Success",
                   message: "product added created",
                  product
               })
               
           }
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    addProduct
}

