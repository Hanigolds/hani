import React from "react";
import { ColorRing } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="flex justify-center items-center bg-black h-[40px] w-[40px] mt-2 mx-auto rounded-md">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff",]}
      />
    </div>
  );
};

export default Loader;
