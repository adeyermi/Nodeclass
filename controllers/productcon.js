const productModel = require("../model/productmod");


async function addProduct(req, res) {

    if(!req.file){
        return res.status(400).json({
            message:"no image"
        })
    }
   const image = req.file.path
    try {
        const product = await productModel.create({...req.body, productImage: image})

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

