import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/Category";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_API_URL;
const Category = createContext();
const initialState = {
  category: "", // Always set a default value
  subCategory: "",
  allCategory: [], // Default to an empty string
  isLoading: false,
  isError: false,
  msg: "",
};
const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
   
    dispatch({
      type: "CATEGORY_CHANGE",
      payload: {
        name,
        value,
      },
    });
  };
  const handleSubCategoryChange = (e) => {
    const { name, value } = e.target;
  
    dispatch({
      type: "SUBCATEGORY_CHANGE",
      payload: {
        name,
        value,
      },
    });
  };
 
  // ! handle add to category to databse
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({
        type: "SET_LOADING",
      });
      const response = await fetch(`${url}/api/create-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: state.category,
          subCategory: state.subCategory,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.msg);
        dispatch({
          type: "SET_SUCCESS",
        });
      } else {
        toast.success(data.msg);
      }
    } catch (error) {}
  };
  const getCategories = async () => {
    try {
      dispatch({
        type: "SET_LOADING",
      });
      const response = await fetch(
        `${url}/api/get-all-category`,
        {
          method: "GET", // GET is the default method, but it's good to be explicit
          headers: {
            "Content-Type": "application/json", // Specify the correct content type
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        dispatch({
          type: "GET_ALL_CATEGORY",
          payload: data.allCategory,
        });
      }
    } catch (error) {}
  };
  return (
    <Category.Provider
      value={{ handleSubCategoryChange, state, handleSubmit, handleCategoryChange,getCategories }}
    >
      {children}
    </Category.Provider>
  );
};

const useCategory = () => {
  return useContext(Category);
};
export { CategoryProvider, useCategory };
