import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="bg-[#f5ebe0] h-screen flex items-center justify-center p-4">
      <div className="max-w-[1080px] mx-auto w-full text-center">
        <h3 className="text-5xl font-bold text-[#4e4640] mb-4">
          404 - Page Not Found
        </h3>
        <p className="text-lg text-[#4e4640] mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#e3d5ca] p-3 rounded font-medium text-[#4e4640] hover:bg-[#d6c9b9]"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Error;
