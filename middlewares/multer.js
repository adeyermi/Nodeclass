const multer = require("multer");
const { cloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig")

const storage = new cloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "nodeclass",
        allowFormats: ['jpeg', 'png', 'jpg'],
        transformation: [{width: 500, height: 500, crop: 'limit'}],
    },

});

const uploadImage = multer({storage: newStorage});
module.exports = uploadImage;