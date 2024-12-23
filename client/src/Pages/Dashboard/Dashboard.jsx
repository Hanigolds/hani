import Chart from "../../Components/Chart";
import React, { useEffect } from "react";
import LeftBar from "../../Components/LeftBar";
import RightBar from "../../Components/RightBar";
import { useProduct } from "../../Context/Products";
// import Heading from "../../Components/Heading";
import {  FaTrash, FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Heading from "../../Components/Heading";
import BarsChart from "../../Components/Bar";
const url = import.meta.env.VITE_API_URL;



const Dashboard = () => {
  const {state,deleteSingleProduct,getAllProducts} = useProduct()
  useEffect(()=>{
    getAllProducts()
      },[])
  return (
    <div className="flex w-full min-h-screen">
      <LeftBar />
      <RightBar>
      <div className="dashboard-container p-4 flex gap-2 flex-wrap">
        <div className="w-[20rem]  shadow dahboard-card-bg flex-1">
          <div className="bg-white w-[100px] h-[100px] rounded-full p-[6px]">
            <img src="/user.jpg" alt="logo" className="rounded-full" />
          </div>
          <div className="flex justify-between">
            <div>
              <h4>Total No Of User Register</h4>
            </div>
            <div>
            <p>345</p>
            </div>
          </div>
        </div>
        <div className="w-[20rem]   shadow dahboard-card-bg p-[6px] flex-1">
          <div className="bg-white w-[100px] h-[100px] rounded-full p-[6px]">
            <img src="/product.png" alt="logo" className="rounded-full" />
          </div>
          <div className="flex justify-between">
            <div>
              <h4>Total No Of User Register</h4>
            </div>
            <div>
            <p>345</p>
            </div>
          </div>
        </div>
        <div className="w-[20rem]   shadow bg-red-400 p-[6px] flex-1">
          <div className="bg-white w-[100px] h-[100px] rounded-full p-[6px]">
            <img src="/order.png" alt="logo" className="rounded-full" />
          </div>
          <div className="flex justify-between">
            <div>
              <h4>Total No Of User Register</h4>
            </div>
            <div>
            <p>345</p>
            </div>
          </div>
        </div>
        <div className="w-[20rem]  shadow dahboard-card-bg p-[6px] flex-1">
          <div className="bg-white w-[100px] h-[100px] rounded-full p-2">
            <img src="/rupee.png" alt="logo" className="rounded-full" />
          </div>
          <div className="flex justify-between">
            <div>
              <h4>Total No Of User Register</h4>
            </div>
            <div>
            <p>345</p>
            </div>
          </div>
        </div>
        <div className="w-[20rem]   shadow dahboard-card-bg p-[6px] flex-1">
          <div className="bg-white w-[100px] h-[100px] rounded-full p-2">
            <img src="/rupee.png" alt="logo" className="rounded-full" />
          </div>
          <div className="flex justify-between">
            <div>
              <h4>Total No Of User Register</h4>
            </div>
            <div>
            <p>345</p>
            </div>
          </div>
        </div>

      </div>
      <div className=" hidden sm:block chart lg:flex lg:gap-4 lg:items-center">
        <Chart/>
        <BarsChart/>
      </div>
      <div className="productList">
       <Heading title="Product List"/>
      <table className="w-full">
            <thead className="bg-gray-600 text-white rounded-md">
              <tr className="border-b-[2px] border-black text-center ">
                <th className="p-2 rounded-full">S.no</th>
                <th>Category Name</th>
                <th>Sub Category</th>
                <th>Design Name</th>
                <th>Gross Weight</th>
                <th>Net Weight</th>
                <th>Remark</th>
                <th>Product Images</th>
                <th>Purity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="border-b-[2px] border-black text-center">
              {state?.allProduct?.map((curEle, index) => {
                return (
                  <tr className="border-b-[2px] text-center" key={curEle._id}>
                    <td className="p-2">{index + 1}</td>
                    <td>{curEle?.category}</td>
                    <td>{curEle?.subCategory}</td>
                    <td>{curEle?.designName}</td>
                    <td>{curEle?.grossWeight}</td>
                    <td>{curEle?.netWeight}</td>
                    <td>{curEle?.remark}</td>
                    <td className=" ">
                      <div className="flex justify-center">
                       <img src={`${url}/api/product-photo/${curEle._id}`}className="w-[30px] h-[30px] border border-white  hover:border-2 hover:border-white rounded-full" alt="" />
                      </div>
                    </td>
                    <td>{curEle?.purity}</td>
                    <td className="">
                      <div className="flex justify-center gap-4">
                        <FaTrash className="text-red-600 font-bold" onClick={()=>deleteSingleProduct(curEle._id)} />
                          <Link to ={`/product/${curEle._id}`}>
                        <FaUserEdit className="text-green-800 font-bold"   />
                          </Link>
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

export default Dashboard;
