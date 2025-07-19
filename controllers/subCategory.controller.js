const express = require('express');
const fs = require("fs").promises;
const catchAsyncError = require('../middleware/catchAsyncError');
const SubCategory = require('../models/subcategory.model');
const ErrorHandler = require('../utilities/ErrorHandler');
const ValidationError = require('../utilities/ValidationError');
const { uploadImage, deleteImage } = require('../services/cloudinary.service');
exports.createSubCategory = catchAsyncError(async (req, res, next) => {
    const { name, description, icon,slug, subCategoryparent, isActive, showOnHome } = req.body;
    const image = req.files.images;
    if (!image || !req.files) {
      throw new ValidationError('Please upload at least one image');
    }

    //check file is arry and its array to defat one image or array
    const files = Array.isArray(image) ? image : [image];

  const images = await uploadImage(files, 'SubCategory')
  console.log(images);
    const subCategory = await SubCategory.create({
      name,
      description,
      icon,
      slug,
      images,
      subCategoryparent,
      isActive,
      showOnHome,
    });

    res.status(201).json({
      success: true,
      message : "SubCategory Created Successfully",
      subCategory,
    })
})
exports.getSubCategory = catchAsyncError(async (req, res, next) => {
    const subCategory = await SubCategory.find({ isActive: true , isPublished : true })
    res.status(200).json({
        success: true,
        message: "SubCategory fetched successfully",
        subCategory
    })
})
exports.deleteSubCategory = catchAsyncError(async (req, res, next) => {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
        return next(new ErrorHandler("SubCategory not found", 404));
    }
    // cloudinary image also remove
    await deleteImage(subCategory.images);
    await subCategory.deleteOne();
    res.status(200).json({
        success: true,
        message: "SubCategory deleted successfully",
    });
})
//delete more subCategory one time
exports.delteSubcategoryMultiple = catchAsyncError(async (req, res, next) => {
   const {ids} = req.body;
   if(!ids){
    throw new ValidationError("Ids are required")
   }
   const idArry = Array.isArray(ids) ? ids : [ids];

   const categories = await SubCategory.find({_id : {$in : idArry}});
   if(categories.length === 0){
    return next(new ErrorHandler("Category not found", 404));
   }

  for(const category of categories){
     if(category.images){
      await deleteImage(category.images);
     }
  }
    
   const subCategory = await SubCategory.deleteMany({_id : {$in : idArry}});
   if(subCategory.deletedCount === 0){
    return next(new ErrorHandler("SubCategory not found", 404));
   }
   res.status(200).json({
    success: true,
    message:`${subCategory.deletedCount} SubCategory deleted successfully`,
   })


   
})
