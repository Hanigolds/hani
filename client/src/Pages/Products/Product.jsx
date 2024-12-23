import React, { useEffect } from "react";
import LeftBar from "../../Components/LeftBar";
import RightBar from "../../Components/RightBar";
import { useLocation } from "react-router-dom";
import { useProduct } from "../../Context/Products";
import Heading from "../../Components/Heading";
const url = import.meta.env.VITE_API_URL;


const Product = () => {
  const name = useLocation().pathname.split("/")[2]
 const {getSingleProduct,state}= useProduct()
  useEffect(()=>{
getSingleProduct(name)
  },[name])
  return (
    <div className="flex w-full min-h-screen">
      <LeftBar />
      <RightBar>
      <div className="table-container w-[100%] p-2">
          <Heading title="Product Details" />
          <div className="container flex justify-center items-center">
            <div>
            <div className="img flex justify-center items-center">
            {/* src={`${curEle._id}`} */}
            <img src={`${url}/api/product-photo/${state?.product?._id}`} className=" border border-white  hover:border-2 hover:border-white  w-[800px] h-[300px]" alt="logo" />
            </div>
            <div className=" p-4 text-blue-300 font-bold text-xl uppercase">
            <div>
              <strong>Category :- {state?.product?.category}</strong>
            
             </div>
            <div> <strong>Sub Category :- {state?.product?.subCategory}</strong></div>
            </div>
            <div className="flex gap-5 p-4">
            <div> <strong>Gross Weight</strong> {state?.product?.grossWeight}</div>
            <div> <strong>Desgin Name</strong> {state?.product?.designName}</div>
            <div><strong>Net Wt</strong></div>
           
            <div>
              <p>{state?.product?.netWeight}</p>
            </div>
            </div>
            <div>
            <div className="border-b border-black">Remark:- {state?.product?.remark}</div>
            </div>
            </div>
         
            
          </div>
        </div>
      </RightBar>
    </div>
  );
};

export default Product;
