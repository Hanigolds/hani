import React from "react";
import { useDashboard } from "../Context/Dashboard";
import { RiMenu2Line } from "react-icons/ri";
import { FaMoon, FaSun } from "react-icons/fa";

const Topbar = () => {
  const { handleToggleDashboard, toggleColor, handleToggleDashboardColor } =
    useDashboard();
  return (
    <div className="w-full h-[40px] border-b  flex items-center justify-between">
      <div>
        <RiMenu2Line
          onClick={handleToggleDashboard}
          className="cursor-pointer ml-3 text-xl"
        />
      </div>
      <div>
      <h1 className="hidden lg:block lg:font-bold lg:text-[#6c84fc]">HANI GOLDS INVENTORY SYSTEM</h1>
      </div>
      <div className="text-xl mr-4">
        {toggleColor ? (
          <FaMoon onClick={handleToggleDashboardColor} />
        ) : (
          <FaSun onClick={handleToggleDashboardColor} />
        )}
      </div>
    </div>
  );
};

export default Topbar;
