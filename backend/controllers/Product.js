const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const Category = require("../models/Category");
const fs = require("fs"); 
const mongoose = require("mongoose")


const filterSubCategory = async (req, res) => {
  try {
    // todo Destructure the incoming data from the body
    const {
      value,
    } = req.body;
   
   if(value=="gold"){
    const filterSubCat = await Category.find({
      isGold:true})
      res.status(200).json({
        success: true,
        msg: "subCategory filter sucessfully!",
        filterSubCat,
      });
   }
   else if(value=="silver"){
    const filterSubCat = await Category.find({
      isSilver:true})
      res.status(200).json({
        success: true,
        msg: "subCategory filter sucessfully!",
        filterSubCat,
      });
   }
   else if(value=="barandcoins"){
    const filterSubCat = await Category.find({
      isBarAndCoin:true})
      res.status(200).json({
        success: true,
        msg: "subCategory filter sucessfully!",
        filterSubCat,
      });
   }
   
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};


// ? Controller to handle the product addition

const createProduct = async (req, res) => {
  try {
      const {category,
        subCategory,
        designName,
        grossWeight,
        netWeight,
        remark,
        purity, } = req.fields
       
      const { photo } = req.files;
     
      const products =  new Product({ ...req.fields})
      if (photo) {
          products.photo.data = fs.readFileSync(photo.path);
         
          products.photo.contentType = photo.type
      }
      await products.save();
     
      res.status(200).send({
          success: true,
          message: "Product Aded sucessfully",
          products
      })

  } catch (error) {
      console.log(error)
      res.status(500).send({
          sucess: false,
          error,
          message: "Error in  creating a new Product"
      })

  }


}

// ! get all project
const getProducts = async (req, res) => {
  try {
      const products = await Product.find({}).select("-photo")
      res.status(200).send({
          sucess: true,
        
          message: "All Products",
          products
      })

  } catch (error) {
      console.log(error)
      res.status(500).send({
          sucess: false,
          error,
          message: "Error in getting Products"
      })

  }

}
// ? getSingleProduct

const getProduct = async (req, res) => {
 
  try {
      const product = await Product.findOne({ _id: req.params.id }).select("-photo")
    
      res.status(200).send({
          sucess: true,
          message: true,
          product
      })

  } catch (error) {
      console.log(error)
      res.status(500).send({
          sucess: false,
          error,
          message: "Error  Occured During  fechting singleProduct"

      })

  }
}
// ! delete a product
const deleteProduct = async (req, res) => {
  try {
    // await Product.findByIdAndDelete(req.params.id).select("-photo");
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({
      sucess: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error while deleting product",
      error,
    });
  }
};
//  todo get product by catgory 
const getProductPhoto = async (req, res) => {
  try {
      const { pid } = req.params; // Extract 'pid' from request params
      console.log("pid:", pid);

      // Validate the pid
      if (!pid) {
          return res.status(400).send({
              success: false,
              message: "Product ID is required",
          });
      }

      // Validate pid format
      if (!mongoose.Types.ObjectId.isValid(pid)) {
          return res.status(400).send({
              success: false,
              message: "Invalid Product ID format",
          });
      }

      // Fetch product by ID and select only the photo field
      const product = await Product.findById(pid).select("photo");

      if (!product) {
          return res.status(404).send({
              success: false,
              message: "Product not found",
          });
      }

      if (product.photo && product.photo.data) {
          // Set response headers and send the photo data
          res.set("Content-Type", product.photo.contentType);
          return res.status(200).send(product.photo.data);
      } else {
          return res.status(404).send({
              success: false,
              message: "Photo not found for this product",
          });
      }
  } catch (error) {
      console.error("Error in getProductPhoto:", error);
      res.status(500).send({
          success: false,
          error: error.message || error,
          message: "Failed to get photo",
      });
  }
};

const gold = async (req, res) => {
  try {
    const goldProducts = await Product.find({ category: "gold" });
    if (goldProducts) {
      return res.status(200).send({
        success: true,
        msg: "Gold products retrieved successfully!",
        goldProducts,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};

const silver = async (req, res) => {
  try {
    const silverProducts = await Product.find({ category: "silver" });
  ; // Corrected to log silverProduct
    if (silverProducts) {
      return res.status(200).send({
        success: true,
        msg: "Silver products retrieved successfully!",
        silverProducts,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};
const barAndCoins = async (req, res) => {
  try {
    const barAndCoinsProducts = await Product.find({ category: "barandcoins" });
  ; // Corrected to log silverProduct
    if (barAndCoinsProducts) {
      return res.status(200).send({
        success: true,
        msg: "bar And  Coins Products products retrieved successfully!",
        barAndCoinsProducts,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};

// todo filter product based on particular category
const category = async (req, res) => {
  try {
    const { category } = req.params;
   

    // Group products by subcategory and count the number of products in each subcategory
    const groupedProducts = await Product.aggregate([
      { $match: { category } }, // Match products by category
      { $group: { _id: "$subCategory", count: { $sum: 1 } } }, // Group by subcategory and sum the count
    ]);
   

    if (!groupedProducts.length) {
      return res
        .status(404)
        .json({ success: false, msg: "No products found for this category" });
    }

    res.status(200).json({
      success: true,
      groupedProducts, // Return the grouped products with the sum of each subcategory
    });
  } catch (error) {

    res.status(500).json({ success: false, msg: "Server error" });
  }
};
const subCategory = async (req, res) => {
  try {
    const subcategory = req.params.subcategory;
   

    // todo Group products by subcategory and count the number of products in each subcategory
    const filterSub = await Product.find({
      subCategory: subcategory,
    });
  

    if (!filterSub.length) {
      return res
        .status(404)
        .json({ success: false, msg: "No products found for this category" });
    }

    res.status(200).json({
      sucess: true,
      filterSub, //  todo Return the grouped products with the sum of each subcategory
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// ? update a new product
// ? update a new product
// const updateProduct = async (req, res) => {
//   try {
//       const { name, slug, description, price, category, quantity, shipping } = req.fields
//       const { photo } = req.files;
//       const products = await Product.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })

//       if (photo) {
//           products.photo.data = fs.readFileSync(photo.path);
//           products.photo.contentType = photo.type
//       }
//       await products.save();
//       res.status(200).send({
//           sucess: true,
//           message: "Update  sucessfully",
//           products
//       })

//   } catch (error) {
//       console.log(error)
//       res.status(500).send({
//           sucess: false,
//           error,
//           message: "Error in  creating a updating a  Product"
//       })

//   }


// }


// Export the delete controller


// ? Export the controller and multer middleware
module.exports = {
  
  createProduct,
  silver,
  filterSubCategory,
  getProducts,
  getProductPhoto,
  getProduct,
  deleteProduct
  ,subCategory
  ,category,
  barAndCoins,
  gold
  
};
