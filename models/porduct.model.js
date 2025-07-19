const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    slug: {type:String,required:true,unique:true},
    shortDescription : {
        type : String,
    },
    description : {
        type : String,
        required : true,
    },

    //brand
    brand : {
        type : String,
    },
    manufacture : {
        type : String,
    },
    //category
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true,
    },
    subCategories : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'SubCategory',
    
    },

    //seller
    seller : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    images : [
        {
            url : String,
            public_id : String,
            alt : String,
            width : Number,
            height : Number,
            
        }
    ],
    //pricing
    price : {type : Number,required : true},
    discount : {type : Number, default : 0},
    finalPrice : {
        type : Number,
    },
    //stock
    stock : {
        type : Number,
        required : true,
        min: 0
    },
    sku :{
        type : String, 
        unique : true,
    },
    unit : {
        type : String,
        enum : ['kg','g','l','ml','pcs'],
        default : 'pcs',
    },
    tags : [{
        type : String,
    }],
    specifications : {
        type : Map,
        of : String,
    },
    warranty : {type : String},
    returnPolicy : {type : String},
    deliveryInfo : {
        type :{
            type:String,
            enum :['standard','express','pikup','digital'],
            default : 'standard',
        },
        time : String,
        charge : {type : Number, default : 0},
        freeDelivery : {type : Boolean, default : false},
    },
    //status
    status : {
        type : String,
        enum : ['active','inactive','out-of-stock'],
        default : 'active',
    },
    isPublished : {type : Boolean, default : false},
    isVerified : {type : Boolean, default : false},
    isDeleted : {type : Boolean, default : false},
    deletedAt : {type : Date},
    createdAt : {type : Date, default : Date.now()},
    updatedAt : {type : Date, default : Date.now()},

    ratings :{
        average : {type : Number, default : 0},
        totalRatings : {type : Number, default : 0},
        riviews :[{
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
            },
            rating : {type : Number, default : 0},
            comment : String,
            createdAt : {type : Date, default : Date.now()},
        }]
    },
    searchPopularity : {
        percent : {type : Number, default : 0},
        totalSearchCount : {type : Number, default : 0},
        lastSearchedAt : {type : Date},
    },
    isFeatured : {type : Boolean, default : false},
    isFlashDeal : {type : Boolean, default : false},
    showOnHome : {type : Boolean, default : false},
    offerTittle : String,
    campaign : {
        name :String,
        start : Date,
        end : Date,
        bannerUrl : String,
    },
    moderation : {
        createBy : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
        approvedBy : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},

        approvalStatus : {
            type : String,
            enum : ["pending", "approved", "rejected"],
            default : "pending"
        },
        rejectionReason : String,
    },
    lang: {
        type : String,
        enum : ["en", "ar", "bn"],
        default : "en"
    },   

},{
     timestamps : true
}
)
module.exports = mongoose.model('Product', ProductSchema);