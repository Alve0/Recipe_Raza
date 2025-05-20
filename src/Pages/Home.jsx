import React from "react";
import { Outlet } from "react-router";
import Navber from "../Components/Navber_Footer/Navber";
import Footer from "../Components/Navber_Footer/Footer";

function Home() {
  return (
    <div className=" bg-[#f5ebe0] ">
      <Navber />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Home;
