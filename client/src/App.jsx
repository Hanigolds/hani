import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Cat from "./Pages/Categories/Cat";
import CatList from "./Pages/Categories/CatList";
import NewProduct from "./Pages/Products/NewProduct";
import ProductsList from "./Pages/Products/ProductsList";
import Product from "./Pages/Products/Product";
import UserList from "./Pages/Users/UserList";
import OrderList from "./Pages/Orders/OrderList";
import { useDashboard } from "./Context/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rates from "./Pages/Rates/SilverRate";
import NewImg from "./Pages/Images/NewImg";
import ImgList from "./Pages/Images/ImgList";
import GoldRate from "./Pages/Rates/GoldRate";

const App = () => {
  const { toggleColor } = useDashboard();
  return (
    <div
      className={
        toggleColor ? "bg-black text-gray-500 transition" : "bg-white text-black transition"
      }
    >
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newcat" element={<Cat />} />
        <Route path="/catlist" element={<CatList />} />
        <Route path="/newproduct" element={<NewProduct />} />
        <Route path="/productslist" element={<ProductsList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/silverrate" element={<Rates />} />
        <Route path="/goldrate" element={<GoldRate />} />
        <Route path="/newimg" element={<NewImg />} />
        <Route path="/imglist" element={<ImgList />} />
      </Routes>
    </div>
  );
};

export default App;
