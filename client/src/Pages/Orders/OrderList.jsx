import React from "react";
import LeftBar from "../../Components/LeftBar";
import RightBar from "../../Components/RightBar";
import { useEffect } from "react";
import { useState } from "react";
import Heading from "../../Components/Heading";
import {  FaTrash } from "react-icons/fa";
const url = import.meta.env.VITE_API_URL;
const OrderList = () => {
  const [cart, setCart] =useState([])
  const getCartItem =async() =>{
    const url1 = `${url}/api/cart/allcart`;
    try {
      const response = await fetch(url1, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          // Ensure the token is prefixed correctly
        },
         // Pass the product id in the request body
      });
  
      // Check if the response is ok (status in the range 200-299)
  
      const data = await response.json();
      if(data.success){
        setCart(data.allCart)
      }
    
    } catch (error) {
      // Handle the error
    }
  
  }
  useEffect(()=>{
  getCartItem()
  },[])
  const handleConformed =async(id,cartid)=>{
    // console.log(id,_id)
  
    
    const url2 = `${url}/api/cart/conformed/${id}/${cartid}`;
    try {
      const response = await fetch(url2, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }, 
      });
      const data = await response.json();
      if(data.success){
       alert(data.msg)
      }
    } catch (error) {
      // Handle the error
    }
  }
  return (
    <div className="flex w-full min-h-screen">
      <LeftBar />
      <RightBar>
        <div className="table-container overflow-x-scroll w-[100%] p-2">
          <Heading title="Order List" />
          <table className="w-full ">
            <thead className="bg-gray-400 text-white">
              <tr className="border-b-[2px] border-black text-center">
                <th className="p-2">S.no</th>
                <th>Customer Name</th>
                <th>Customer Mobile No</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Design Name</th>
                <th>Photo</th>
                <th>Gross Weight</th>
                <th>Net Weight</th>
                <th>IsConformed</th>
              </tr>
            </thead>
            <tbody className="border-b-[2px] border-black text-center">
              {cart?.map((curEle, index) => {
                return (
                  <tr className="border-b-[2px] text-center" key={curEle._id}>
                    <td className="p-2">{index + 1}</td>
                    <td>{curEle?.userName}</td>
                    <td>{curEle?.userMobile}</td>
                    
                    <td>{curEle?.category}</td>
                    <td>{curEle?.subCategory}</td>
                    <td>{curEle?.designName}</td>
                    <td className=" ">
                      <div className="flex justify-center">
                       <img  src={`${url}/api/product-photo/${curEle.conformedId}`} className="w-[30px] h-[30px] border border-white  hover:border-2 hover:border-white rounded-full" alt="" />
                      </div>
                    </td>
                    <td>{curEle.grossWeight}</td>
                    <td>{curEle.netWeight}</td>
                    {/* <td>{curEle?.address}</td> */}
                    <td className="">
                      <div className="flex justify-center gap-4">
                        <FaTrash className="text-red-500 font-bold" onClick={()=>handleConformed(curEle.conformedId,curEle._id)} />    
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

export default OrderList;
