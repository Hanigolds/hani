const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    isGold:{
      type:Boolean,
      default:false
    },
    isSilver:{
      type:Boolean,
      default:false
    },
    isBarAndCoin:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields automatically
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
