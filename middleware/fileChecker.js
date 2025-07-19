
const sharp = require('sharp');
const catchAsyncError = require('./catchAsyncError');
const ErrorHandler = require('../utilities/ErrorHandler');
const ValidationError = require('../utilities/ValidationError');
const fs = require('fs').promises
exports.fileChecker = catchAsyncError(async (req, res, next ) => {
    const image = req.files.image
    console.log(image)

    if (!image) {
        
        throw new ValidationError('Please upload an image')
    }
      const allowedTypes = ["image/jpeg","image/png", "image/webp"];

        if (!allowedTypes.includes(image.mimetype)) {
        await fs.unlink(image.tempFilePath);
        throw new ValidationError("Only JPEG, PNG, or WEBP images are allowed");
        }

    if (image.size > 1024 * 1024 * 2) {
        await fs.unlink(image.tempFilePath)
        throw new ValidationError('Please upload an image less than 2MB')
    }
    //sharp is used to resize the image
    const metadata =  await sharp(image.tempFilePath).metadata()
    console.log(metadata)
    if(metadata.width !== 720 || metadata.height !== 300){
        await fs.unlink(image.tempFilePath)
        throw new ValidationError('Please upload an image less than 300px by 300px')
    }

    next()

})
