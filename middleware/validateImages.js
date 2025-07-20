// validateImages
const sharp = require('sharp');
const ValidationError = require('../utilities/ValidationError');
const fs = require('fs').promises;
module.exports = (maxImage, allowdTypes = ['image/jpeg', 'image/png']) => {
    return async(req, res, next) => {
          const files = req.files?.images;
      const images = Array.isArray(files) ? files : [files];
      console.log(images)
        if(!images) {
            await Promise.all(images.map(async (image) => await fs.unlink(image.tempFilePath)));
            throw new ValidationError("Please upload at least one image");
        }
        if(images.length > maxImage) {
            await Promise.all(images.map(async (image) => await fs.unlink(image.tempFilePath)));
            throw new ValidationError(`You can upload only ${maxImage} images`);
        }

        for(let file of images){
            if(!allowdTypes.includes(file.mimetype)){
                 await Promise.all(images.map(async (image) => await fs.unlink(image.tempFilePath)));
                throw new ValidationError(`You can upload only ${allowdTypes.join(", ")} files`);
            }
            if(file.size > 1024 * 1024 * 2) {
                await Promise.all(images.map(async (image) => await fs.unlink(image.tempFilePath)));
                throw new ValidationError("Image size should be less than 2MB");
            }
            
        }
        next();
    }
}