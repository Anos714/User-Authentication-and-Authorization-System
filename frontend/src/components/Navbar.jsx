import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-md flex ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/home" className="hover:text-gray-200 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-200 transition">
              Products
            </Link>
            <Link to="/admin" className="hover:text-gray-200 transition">
              Admin
            </Link>
            <Link to="/about" className="hover:text-gray-200 transition">
              About
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-white border border-white px-3 py-1 rounded"
            >
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/home"
              onClick={() => setIsOpen(false)}
              className="block hover:text-gray-200"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className="block hover:text-gray-200"
            >
              Products
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block hover:text-gray-200"
            >
              Admin
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block hover:text-gray-200"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
