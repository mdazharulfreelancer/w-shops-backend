const express = require('express');
const catchAsyncError = require('../middleware/catchAsyncError');
const { uploadImage } = require('../services/cloudinary.service');
const Product = require('../models/porduct.model')
const ErrorHandler = require('../utilities/ErrorHandler');
const TestSchema = require('../models/test.model');

exports.ProductRegister = catchAsyncError( async (req, res, next) => {
    const {name, slug, shortDescription, description, brand, manufacture, category, subCategories, seller,  price, discount, finalPrice, stock, sku, unit,tags, specifications,warranty, returnPolicy , deliveryInfo, status, isPublished,isVerified, isDeleted,ratings, searchPopularity, isFeatured,isFlashDeal, showOnHome, offerTittle, moderation, lang, } = req.body;

    // IMAGE UPLOAD 
    // Simulate image upload logic
    const file = req.files?.images
    if(!file){
        throw new ErrorHandler("Please upload image", 400,'Valdition Error')
    }
    const fileArry = Array.isArray(file) ? file : [file];
    const uploadImage = await uploadImage(fileArry);

    const product = await Product.create({
        name, slug, shortDescription, description, brand, manufacture, category, subCategories, seller,  price, discount, finalPrice, stock, sku, unit,tags, specifications,warranty, returnPolicy , deliveryInfo, status, isPublished,isVerified,ratings, searchPopularity, isFeatured,isFlashDeal, showOnHome, offerTittle, moderation,isDeleted, lang, images: uploadImage
    })

    // Simulate product registration logic
    res.status(200).json({
        success: true,
        message: "Product registered successfully",
        product
    })
});

exports.createTest = catchAsyncError(async (req, res, next) => {
    const {name, description} = req.body;

    // IMAGE UPLOAD
    const file = req.files?.images
    if(!file){
        throw new ErrorHandler("Please upload image", 400,'Valdition Error')
    }
    const fileArry = Array.isArray(file) ? file : [file];
    const images = await uploadImage(fileArry, "test");

    const test = await TestSchema.create({
        name, description, images
    })
    res.status(200).json({
        success: true,
        message: "Product registered successfully",
        test
    })
})