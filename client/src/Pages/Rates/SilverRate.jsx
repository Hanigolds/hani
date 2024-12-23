import React from 'react'
import LeftBar from '../../Components/LeftBar';
import RightBar from '../../Components/RightBar';
import Heading from '../../Components/Heading';
import { RiDeleteBinFill } from "react-icons/ri";
import { useEffect } from 'react';
import { useState } from 'react';
const url = import.meta.env.VITE_API_URL;
const SilverRate = () => {
    const [rate, setRate] = useState("");
  const [extra, setExtra] = useState("");
  const [allRate, setAllRate] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${url}/api/silver/create`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          rate,extra
        })
      });
      // console.log(response)
    const data = await response.json()
    // console.log(data)
    if(data.success){
      alert(data.msg)
    }
   

    
    } catch (err) {
     
      console.error('Fetch error:', err);
    }
  };
  const getAllRates = async() =>{
    try {
      const response = await fetch(`${url}/api/silver/gets`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
       
      });
      // console.log(response)
    const data = await response.json()
    // console.log(data)
    if(data.success){
     setAllRate(data.rates)
    }
   

    
    } catch (err) {
     
      console.error('Fetch error:', err);
    }
  }
  useEffect(()=>{
    getAllRates()
  },[])
  const handleRateDelete = async (id) => {
    try {
      const response = await fetch(`${url}/api/silver/delete/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      
      });
      // console.log(response)
    const data = await response.json()
    // console.log(data)
    if(data.success){
      alert(data.msg)
    }
   

    
    } catch (err) {
     
      console.error('Fetch error:', err);
    }
  };

 
    return (
        <div className="flex w-full min-h-screen">
          <LeftBar />
          <RightBar>
          <Heading title="New Rate(SILVER)" />
          <div className="cat-container flex flex-wrap justify-center items-center  p-[2px]">
          <div className="form-container w-[75%] h-full shadow p-2">
          <form onSubmit={handleSubmit}>
              <div>
              <label htmlFor="" className='block my-4'>New Rate</label>
              <input type="number"  className='border w-full px-4 py-1' placeholder='New Rate' value={rate} onChange={(e)=>setRate(e.target.value)}/>
              </div>
              <div>
              <label htmlFor="" className='block my-4'>Extra</label>
              <input type="number"  className='border w-full px-4 py-1' placeholder='Extra' value={extra} onChange={(e)=>setExtra(e.target.value)}/>
              </div>
              {/* handle submit button */}
              <div className='my-4'>
                <input type="submit" value="Add" className='bg-black text-white px-12 py-2' />
              </div>
            </form>
         
            </div>
            </div>
            <div className="table-container overflow-x-scroll w-[100%] p-2">
              <Heading title="Rate List(SILVER)" />
             
             <table className="w-full ">
                         <thead className="bg-gray-400 text-white">
                           <tr className="border-b-[2px] border-black text-center">
                             <th className="p-2">S.NO</th>
                             <th className="uppercase">Rate</th>
                             <th className="uppercase">Extra</th>
                             <th className="uppercase">Action</th>
                           </tr>
                         </thead>
                         <tbody className="border-b-[2px] border-black text-center">
                           {allRate?.map((curEle, index) => {
                             return (
                               <tr className="border-b-[2px] text-center" key={curEle._id}>
                                 <td className="p-2">{index + 1}.</td>
                                 <td className="uppercase">Rs {curEle?.rate}/-</td>
                                 <td className="uppercase">Rs {curEle?.extra}/-</td>
                                <td>
                                   <div className="flex justify-center">
                                     <RiDeleteBinFill className="text-red-400 font-bold text-2xl" onClick={()=>handleRateDelete(curEle._id)} />
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
}

export default SilverRate