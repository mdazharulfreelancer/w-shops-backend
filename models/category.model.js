const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    
    name: {
      type: String,
      required: [true, "Category name is required"],
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
    subCategories: [{type: mongoose.Schema.Types.ObjectId, ref: "SubCategory"}],
    image: {
       public_id: String,
       url: String,
       width : Number,
       height : Number,
    },
    
    isActive: {
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
module.exports = mongoose.model('Category', categorySchema);