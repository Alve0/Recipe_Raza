import React from "react";
import { Outlet } from "react-router";

function Home() {
  return (
    <div className=" bg-[#f5ebe0] ">
      <Outlet />
    </div>
  );
}

export default Home;
