import React from "react";
import { Link } from "react-router-dom";

const SideItem = ({ icon, link, name }) => {
  return (
    <Link to={`/${link}`}>
      <div className="p-[3px] flex items-center gap-2 text-[16px]">
        <div className="text-[21px]">{icon}</div>
        <div className="">{name}</div>
      </div>
    </Link>
  );
};

export default SideItem;
