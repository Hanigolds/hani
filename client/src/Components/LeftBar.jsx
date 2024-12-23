import React from "react";
import { useDashboard } from "../Context/Dashboard";
import { MdDashboardCustomize,MdOutlinePlaylistAdd,MdAddAPhoto,MdOutlineCurrencyRupee   } from "react-icons/md";
import { IoBagAddSharp } from "react-icons/io5";
import {  FaCartArrowDown,FaRupeeSign } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
// import { FaRupeeSign } from "react-icons/fa6";
import { PiUserListFill } from "react-icons/pi";
import SideItem from "./SideItem";
import { FcStackOfPhotos } from "react-icons/fc";
// import { LuBadgeIndianRupee } from "react-icons/lu";

const LeftBar = () => {
  const { toggleDashboard, type, handleType } = useDashboard();
  // const pathName = useLocation().pathname.split("/")[1];
  //  todo this is bug useEffect(() => {
  //   handleType(pathName);
  //   console.log(pathName);
  // }, [pathName]);

  // useEffect(() => {
  //   const savedType = localStorage.getItem("activeType");
  //   if (savedType) {
  //     setType(savedType); // Set the type to the saved value
  //   }
  // }, [setType]);

  // Save the active type in localStorage whenever it changes
  const handleClick = (newType) => {
    handleType(newType); // Update the type state
    localStorage.setItem("activeType", newType); // Save to localStorage
  };

  return (
    <div
      className={
        toggleDashboard
          ? " w-[0%]    shadow relative top-0 left-[-180px] transition"
          : "w-[40%]   shadow xl:w-[13%] lg:w-[15%] md:w-[30%] sm:w-[30%] p-[1px] transition"
      }
    >
      {/* main heading title */}
      <div className="h-[40px]">
       
        <li className="list-none text-[#6c84fc] font-bold">ADMIN DASHBOARD</li>
      </div>
      {/* main */}
      <div className="h-[40px] flex items- my-1">
        <li className="list-none">MAIN</li>
      </div>
      {/* dashboard */}
      <div
        className={
          type == "dashboard"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("dashboard")}
      >
        <SideItem
          name="Dashboard"
          link="dashboard"
          icon={<MdDashboardCustomize />}
        />
      </div>
      {/* new category */}
      <div
        className={
          type == "newcat"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("newcat")}
      >
        <SideItem link="newcat" name="New Category" icon={<IoBagAddSharp />} />
      </div>
      {/* categorylist */}
      <div
        className={
          type == "catlist"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("catlist")}
      >
        <SideItem name="Category List" link="catlist" icon={<MdOutlinePlaylistAdd  />} />
      </div>
      {/* new product */}
      <div
        className={
          type == "newproduct"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("newproduct")}
      >
        <SideItem
          name="New Product"
          link="newproduct"
          icon={<IoBagAddSharp />}
        />
      </div>
      {/* product list */}
      <div
        className={
          type == "productslist"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("productslist")}
      >
        <SideItem
          name="Product List"
          link="productslist"
          icon={<FaProductHunt />}
        />
        {/* user list */}
      </div>
      {/* order list */}
      <div
        className={
          type == "orderlist"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("orderlist")}
      >
        <SideItem
          name="Order List"
          link="orderlist"
          icon={<FaCartArrowDown />}
        />
      </div>
      <div
        className={
          type == "userlist"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("userlist")}
      >
        <SideItem name="User List" link="userlist" icon={<PiUserListFill />} />
      </div>
      <div
        className={
          type == "silverrate"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("silverrate")}
      >
        <SideItem name="Sliver Rate" link="silverrate" icon={<FaRupeeSign />} />
      </div>
      <div
        className={
          type == "goldrate"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("goldrate")}
      >
        <SideItem name="Gold Rate" link="goldrate" icon={<MdOutlineCurrencyRupee />} />
      </div>
      <div
        className={
          type == "newimg"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("newimg")}
      >
        <SideItem name="New Image" link="newimg" icon={<MdAddAPhoto />} />
      </div>
      <div
        className={
          type == "imglist"
            ? "bg-[#6c84fc] text-white mb-[2px] rounded-sm"
            : " mb-[2px]"
        }
        onClick={() => handleClick("imglist")}
      >
        <SideItem name="Image List" link="imglist" icon={<FcStackOfPhotos />} />
      </div>
    </div>
  );
};

export default LeftBar;
