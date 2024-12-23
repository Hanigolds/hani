import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/Product";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_API_URL;



const Product = createContext();
const initialState = {
  isLoading: false,
  allProduct: [],
  isError: false,
  msg: "",
  category: "",
  subCat: [],
  designName: "",
  remark: "",
  netWeight: "",
  grossWeight: "",
  photo: "", // Change to store the file object, not the string
  purity: "",
  product:{},
  // imagePaths:null,
  allImages:[]
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // todo Handle category
  const handleCategory = async (e) => {
    const {name, value } = e.target;
    try {
      const response = await fetch(`${url}/api/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.msg);
        dispatch({
          type:"SET_CATEGORY",
          payload:{
            name,value,
            subCat:data.filterSubCat
          }
        })
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  ``
  
  // ? Handle sub-category
  const handleSubCategory = (e) => {
    const { name, value } = e.target;
  
    dispatch({
      type: "SET_SUBCATEGORY",
      payload: { name, value },
    });
  };

  // ! Handle other product details
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_PRODUCT",
      payload: { name, value },
    });
  };

  // todo Handle file change (for a single file)
  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0]; 
   // ? Store the file object itself, not just its name
    dispatch({
      type: "SET_FILE",
      payload: { name, value: file },
    });
  };
  // ? handle all images changes
 
  //  todo Handle form submission to upload product details along with the file
  const handleProduct = async (e) => {
    e.preventDefault();
    // Create FormData to include both product details and the image file
    const formData = new FormData();
  
    // Append product data to FormData
    formData.append("category", state.category);
    formData.append("subCategory", state.subCategory);
    formData.append("designName", state.designName);
    formData.append("remark", state.remark);
    formData.append("grossWeight", state.grossWeight);
    formData.append("netWeight", state.netWeight);
    formData.append("purity", state.purity);
    // Append the image to FormData if there is a file
    if (state.photo) {
      formData.append("photo", state.photo); // The actual file object
    }
    try {
      // Send both product data and the image in a single request
      const response = await fetch(
        `${url}/api/newproduct`,
        {
          method: "POST",
          body: formData, // Send the entire FormData
        }
      );
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.msg)      }
    } catch (error) {
     
    }
  };
  // todo handle all images submit
 
  
  //  todo get all products
  const getAllProducts = async() =>{
    try {
      //  !get both product data and the image in a single request
      const response = await fetch(
        `${url}/api/allproduct`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
  
     
      if(data.sucess){
        dispatch({
          type:"GET_ALL_PRODUCTS",
          payload:{
            products:data?.products
          }
       
        })
      } 
    } catch (error) {
     
    }
  }
  //  todo get all images
  const getSingleProduct = async(id) => {
    // Fetch product logic here, e.g., making an API call
    try {
      //  !get both product data and the image in a single request
      const response = await fetch(
        `${url}/api/product/${id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
    
      if(data.sucess){
        dispatch({
          type:"GET_PRODUCT",
          payload:{
            product:data?.product
          }
       
        })
      } 
    } catch (error) {
    
    }
    // ...
  };
  const deleteSingleProduct = async(id) => {
    // Fetch product logic here, e.g., making an API call
    try {
      //  !get both product data and the image in a single request
      const response = await fetch(
        `${url}/api/deleteproduct/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      
      if(data.sucess){
        toast.success(data.message)
      } 
    } catch (error) {
     
    }
    
  };
  return (
    <Product.Provider
      value={{
        state,
        handleCategory,
        handleSubCategory,
        handleProduct,
        handleProductChange,
        handleFileChange,
        getSingleProduct,deleteSingleProduct,getAllProducts
      }}
    >
      {children}
    </Product.Provider>
  );
};

const useProduct = () => {
  return useContext(Product);
};

export {  ProductProvider,useProduct };
