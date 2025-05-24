import React, { use, useState } from "react";
import { ImSpoonKnife } from "react-icons/im";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
function Navber() {
  const { user, signout } = use(AuthContext);
  return (
    <div className="bg-[#a78c6c69] px-5">
      <div className="navbar  bg-transparent shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm bg-transparent dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/all-recipe"}>All recipe</NavLink>
              </li>
              <li>
                <NavLink to={"/add-recipe"}>Add recipe</NavLink>
              </li>
              <li>
                <NavLink to={`/my-recipe/${user?.uid}`}>My recipe</NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-centr">
            <ImSpoonKnife className="size-12" />
            <h3 className=" text-xl font-semibold"> Recipe Raza</h3>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/all-recipe"}>All recipe</NavLink>
            </li>
            <li>
              <NavLink to={"/add-recipe"}>Add recipe</NavLink>
            </li>
            <li>
              <NavLink to={`/my-recipe/${user?.uid}`}>My Recipe</NavLink>
            </li>
          </ul>
        </div>
        {user ? (
          <div className="dropdown dropdown-end navbar-end ">
            <div
              tabIndex={0}
              role="button"
              className=" cursor-grab hover:bg-transparent bg-transparent border-none avatar"
            >
              <div className="w-10  rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  bg-transparent mt-36 rounded-box z-1  w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <NavLink to={"/bookmark"}>Bookmark </NavLink>
              </li>

              <li>
                <a onClick={() => signout()}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex navbar-end gap-3">
            <NavLink
              to={"/login"}
              className="btn bg-transparent border-[#7a6852]"
            >
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              className="btn bg-transparent border-2 border-[#7a6852]"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navber;
