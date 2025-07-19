const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    
    name: {
      type: String,
      required: [true, "SubCategory name is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String, // URL to a category icon (optional)
      default: "",
    },
    images: [{
       public_id: String,
       url: String,
       width : Number,
       height : Number,
    }],
    subCategoryparent :[{type: mongoose.Schema.Types.ObjectId, ref: 'Subcategoryparent', default: null}],
    
    isActive: {
      type: Boolean,
      default: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    showOnHome: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
 
)
module.exports = mongoose.model('Subcategory', subCategorySchema);