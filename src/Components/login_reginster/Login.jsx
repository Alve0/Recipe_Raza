import React, { use } from "react";
import { FaGoogle } from "react-icons/fa6";
import { NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { login, setUser, user } = use(AuthContext);
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password).then(setUser(user));
    console.log(email, password);
    form.reset();
  };

  return (
    <div className="bg-[#f5ebe0] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-[#d6c9b96e] p-6 rounded-lg shadow-md">
        <h3 className="text-4xl text-center font-bold my-6 text-[#4e4640]">
          Login
        </h3>
        <div className="w-full">
          <h4 className="text-2xl font-semibold mb-4 text-[#4e4640]">
            Sign In
          </h4>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#4e4640]">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full p-2 border border-[#4e4640] rounded bg-[#f5ebe0] focus:outline-none focus:ring-2 focus:ring-[#4e4640]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#4e4640]">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full p-2 border border-[#4e4640] rounded bg-[#f5ebe0] focus:outline-none focus:ring-2 focus:ring-[#4e4640]"
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-[#e3d5ca] p-2 rounded font-medium text-[#4e4640] hover:bg-[#d6c9b9]"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-[#4e4640]"></div>
            <span className="mx-4 text-[#4e4640]">or</span>
            <div className="flex-grow h-px bg-[#4e4640]"></div>
          </div>
          <div className="mb-4">
            <button className="w-full flex items-center gap-3 justify-center bg-[#e3d5ca] p-2 rounded font-medium text-[#4e4640] hover:bg-[#d6c9b9]">
              <FaGoogle />
              Sign in with Google
            </button>
          </div>
          <div className="text-center text-sm text-[#4e4640]">
            <p className="mb-1">
              <a href="#" className="hover:underline text-[#4e4640]">
                Forgot Password?
              </a>
            </p>
            <p>
              Don't have an account?{" "}
              <NavLink
                to={"/register"}
                className="hover:underline font-semibold text-[#4e4640]"
              >
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
