import React from "react";
import LeftBar from "../../Components/LeftBar";
import RightBar from "../../Components/RightBar";
import InputField from "../../Components/InputField";
import Heading from "../../Components/Heading";
import Options from "../../Components/Options";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Loader from "../../Components/Loader";
import { useCategory } from "../../Context/Category";



const Cat = () => {
  const { handleSubCategoryChange, state, handleSubmit, handleCategoryChange } = useCategory();

  return (
    <div className="flex w-full min-h-screen">
      {/* sidebar */}
      <LeftBar />
      {/* rightbar */}
      <RightBar>
        {/* loader */}
        {state?.isLoading ? <Loader /> : <></>}
        {/* category form container start */}
        <div className="cat-container flex flex-wrap justify-center items-center  p-[2px]">
          <div className="form-container w-[75%] h-full shadow p-2">
            {/* heading */}
            <Heading title="NEW CATEGORY" />
            <form onSubmit={handleSubmit}>
              <div className="form-group flex justify-between flex-wrap gap-2 w-full">
                {/* gold category select option */}

                <div className="flex justify-center items-center border w-1/4 flex-auto">
                  <select
                    name="category"
                    onChange={(e) => handleCategoryChange(e)}
                    className=" border-[2px] border-black p-2 w-full" defaultValue=""
                  >
                    <option value=""  disabled > SELCT CATEGORY FOR GOLD</option>
                    {/* <Options  title="" disabled /> */}
                    <Options value="gold" title="Gold" />
                    <Options value="silver" title="Silver" />
                    <Options value="barandcoins" title="Bar And Coins" />
                  </select>
                </div>
                {/* sub category input field */}
                <div className="flex-auto">
                  <InputField
                    name="subCategory"
                    placeholder="Add New Sub Category"
                    onChange={(e) => handleSubCategoryChange(e)}
                    value={state.subCategory}
                  />
                </div>
              </div>
              {/* handle submit button */}
              <div className=" w-[150px] lg:w-[220px] my-4">
              {state?.isLoading ? <></> : <Button title="ADD" />}
                
              </div>
            </form>
          </div>
        </div>
      </RightBar>
    </div>
  );
};

export default Cat;
