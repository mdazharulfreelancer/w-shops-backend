const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: "3yyIxgc1U-zQKrTUBMj1ferd1mc",
})
exports.uploadImage = async (files, folder) => {
      try{
           const uploads = files.map((file) =>
            cloudinary.uploader.upload(file.tempFilePath,  {folder : folder} )
        );

 
         const results = await Promise.all(uploads);
         console.log(results);

        await Promise.all(files.map(file => fs.unlink(file.tempFilePath)))

        return results.map((r) => ({ public_id: r.public_id, url: r.secure_url }));
      }catch(err){
          console.log(err);
      }
       
        
}
exports.deleteImage = async (files) => {
    await Promise.all(files.map(async(file) =>{
        await cloudinary.uploader.destroy(file.public_id);
           console.log(`🗑️ Deleted from Cloudinary: ${file.public_id}`);
    }))

    
}
