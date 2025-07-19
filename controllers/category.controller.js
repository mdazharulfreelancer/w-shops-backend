const express = require('express');
const fs = require("fs").promises;
const catchAsyncError = require('../middleware/catchAsyncError');
const Category = require('../models/category.model');
const ErrorHandler = require('../utilities/ErrorHandler');
const  cloudinary  = require('../config/cloudinary.config');
const fileChecker = require('../middleware/fileChecker');
require('dotenv').config();

exports.createCategory = catchAsyncError(async (req, res, next) => {
    const { name, slug, description, icon,  isActive,subCategories, showOnHome } = req.body;
    const image  = req.files.image.tempFilePath
    //cloudnari image upload
    const result = await cloudinary.uploader.upload(image,{
        folder: 'categories',
    }) 
    //remove temp file
    await fs.unlink(image)
    console.log('Temp file removed')

   const public_id = result.public_id;
   const url = result.secure_url;
    //create category
    const category = await Category.create({
      name,
      slug,
      description,
      icon,
      image:{
        public_id,
        url,
        width : 300,
        height : 300,
      },
      isActive,
      subCategories,
      showOnHome,
    });


    res.status(201).json({
        success: true,
        message : "Category created successfully",
        category,
    })

})
exports.getCatrgories = catchAsyncError(async (req, res, next) => {
    const categories = await Category.find().populate('subCategories');
    if(categories.length === 0){
        res.status(404).json({
            success: true,
            message : "No categories found",
        })
    }
    res.status(200).json({
        success: true,
        message : "Categories fetched successfully",
        categories,
    })
})
exports.getCatrgoriesById = catchAsyncError(async (req, res, next) => { 
    const category = await Category.findById(req.params.id).populate('subCategories');
    if(!category){
        res.status(404).json({
            success: true,
            message : "No category found",
        })
    }
    res.status(200).json({
        success: true,
        message : "Category fetched successfully",
        category,  
    })
})

exports.categoryDelete = catchAsyncError(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        throw new ErrorHandler("Category not found",404,"Not Found")
    };
    // also remove cloudnari image
    // cloudnari image find my category image.public_id
    await cloudinary.uploader.destroy(category.image.public_id)
    await category.deleteOne();
    res.status(200).json({
        success: true,
        category_message : "Category deleted successfully",
        message : "Cloudnari image deleted successfully",

    })
})

exports.categoryDelteMeny = catchAsyncError(async (req, res, next) => {
    const {ids} = req.body;
    if(!ids.match(/\b(0x)?[0-9a-fA-F]{24}\b/g)){
        throw new ValidationError("Invalid Id")
    }
    if(ids.length === 0){
        throw new ValidationError("No Ids found")
    }
    const idArry = Array.isArray(ids) ? ids : [ids];
    const categories = await Category.find({_id : {$in : idArry}});
    if(categories.length === 0){
        throw new ValidationError("No Categories found")
    }
    for(const category of categories){
        // also remove cloudnari image
        // cloudnari image find my category image.public_id
        if(!category.image.public_id){
           throw new ValidationError("No image found")
        }
        if(category.image.public_id){
            await cloudinary.uploader.destroy(category.image.public_id)
        }
    }

    const category_delete =  await Category.deleteMany({_id : {$in : idArry}});

    res.status(200).json({
        success: true,
        category_message : `${category_delete.deletedCount} Categories deleted successfully}`,
        message : "Cloudnari image deleted successfully",
    })
})