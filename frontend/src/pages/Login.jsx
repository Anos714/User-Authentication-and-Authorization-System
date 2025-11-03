import React, { useState } from "react";
import { handleSuccess, handleError } from "../utils/utils.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { identifier, password } = loginInfo;
    if (!identifier || !password) {
      return handleError("Username, email, password are required");
    }

    try {
      const url = "http://localhost:8080/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      console.log(result);

      const { success, message, accessToken, username } = result;
      console.log(result.data.username);

      console.log(success, message);

      if (success) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userLoggedIn", result.data.username);
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-sky-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Welcome Back
        </h1>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Username / Email */}
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username or Email
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="identifier"
              id="identifier"
              placeholder="Enter your username or email"
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all"
          >
            Log In
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-indigo-500 hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
