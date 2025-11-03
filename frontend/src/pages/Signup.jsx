import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils/utils.jsx";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = signupInfo;
    if (!username || !email || !password) {
      return handleError("Username, email, password are required");
    }

    try {
      const url = "http://localhost:8080/api/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (!success) {
        handleError();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-sky-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Create an Account
        </h1>

        <form className="space-y-6" onSubmit={handleSignup}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="************"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-500 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
