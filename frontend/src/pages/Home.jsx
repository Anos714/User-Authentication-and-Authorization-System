import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/utils.jsx";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [products, setProducts] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("userLoggedIn"));
  });

  const navigate = useNavigate();

  const handleLogOut = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLoggedIn");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url =
        "https://user-authentication-and-authorizati-eight.vercel.app/api/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <Navbar />
      <div className="h-[100%] w-[100%] flex flex-col gap-5 justify-center items-center">
        <h1 className="text-6xl font-bold">Hello {loggedInUser}</h1>
        <button
          onClick={handleLogOut}
          className="bg-gray-400 h-15 w-60 rounded-2xl text-3xl text-white font-bold"
        >
          Logout
        </button>

        <div>
          {products &&
            products.map((item, index) => {
              return (
                <ul key={index}>
                  <span className="text-black">
                    {item.product} : {item.price}
                  </span>
                </ul>
              );
            })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
