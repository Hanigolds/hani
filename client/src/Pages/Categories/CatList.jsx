import React, { useEffect, useState } from "react";
import LeftBar from "../../Components/LeftBar";
import RightBar from "../../Components/RightBar";
import Heading from "../../Components/Heading";
import AddBtn from "../../Components/AddBtn";
import { RiDeleteBinFill } from "react-icons/ri";
import { useCategory } from "../../Context/Category";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_API_URL;


const CatList = () => {
  const { state, getCategories } = useCategory();
  const[isDelete,setIsDelete] = useState(false)
  useEffect(() => {
    getCategories();
  }, [isDelete]);
  const handleCategoryDelete = async (id) => {
    try {
      setIsDelete(true);  // Set a loading state or show a delete confirmation UI
      const res = await fetch(`${url}/api/delete-category/${id}`, {
        method: "DELETE",
      });
     
  
      if (!res.ok) {
        throw new Error(`Failed to delete category: ${res.statusText}`);
      }
  
      const data = await res.json();
      if(data.success){
        toast.success(data.msg)
      }  // Assuming the response is JSON
  
    
      // You may want to update your state here to reflect the deleted category
    } catch (error) {
      console.error('Error deleting category:', error);
      // Handle the error, possibly show an error message to the user
    } finally {
      setIsDelete(false);  // Reset loading state
    }
  };
  
  return (
    <div className="flex w-full min-h-screen">
      <LeftBar />
      <RightBar>
        {state.isLoading ? <Loader /> : null}
        <div className="table-container overflow-x-scroll w-[100%] p-2">
          <Heading title="Category List" />
          <table className="w-full ">
            <thead className="bg-gray-400 text-white">
              <tr className="border-b-[2px] border-black text-center">
                <th className="p-2">S.NO</th>
                <th className="uppercase">Category</th>
                <th className="uppercase">Sub-Category</th>
                <th className="uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="border-b-[2px] border-black text-center">
              {state?.allCategory?.map((curEle, index) => {
                return (
                  <tr className="border-b-[2px] text-center" key={curEle._id}>
                    <td className="p-2">{index + 1}.</td>
                    <td className="uppercase">{curEle?.category}</td>
                    <td className="uppercase">{curEle?.subCategory}</td>
                    <td className="border border-black">
                      <div className="flex justify-center">
                        <RiDeleteBinFill className="text-red-400 font-bold text-2xl" onClick={()=>handleCategoryDelete(curEle._id)} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </RightBar>
    </div>
  );
};

export default CatList;
