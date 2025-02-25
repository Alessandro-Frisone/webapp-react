import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4">
    <nav className="container mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        🎬 Movie App
      </h1>
      <div className="space-x-6">
        <Link 
          to="/" 
          className="text-lg text-gray-700 font-medium hover:text-pink-500 transition-colors duration-200"
        >
          Home Page
        </Link>
        <Link 
          to="/about" 
          className="text-lg text-gray-700 font-medium hover:text-pink-500 transition-colors duration-200"
        >
          About
        </Link>
        <Link 
          to="/contact" 
          className="text-lg text-gray-700 font-medium hover:text-pink-500 transition-colors duration-200"
        >
          Contact
        </Link>
      </div>
    </nav>
  </header>
  );
}