import React, { use } from "react";
import { Outlet } from "react-router";
import Navber from "../Components/Navber_Footer/Navber";
import Footer from "../Components/Navber_Footer/Footer";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Components/login_reginster/Loading";

export const url = "https://assignment-10-back-end-beta.vercel.app";
// export const url = " http://localhost:3000";

function Home() {
  const { loading } = use(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f5ebe0]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-[#f5ebe0] min-h-screen flex flex-col justify-between">
      <Navber />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
