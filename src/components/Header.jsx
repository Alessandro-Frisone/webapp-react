import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 shadow-lg p-6 border-b border-gray-800">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          🎬 Movie App
        </h1>
        <div className="space-x-8">
          <Link 
            to="/" 
            className="text-xl text-gray-300 font-semibold hover:text-purple-500 transition-colors duration-300"
          >
            Home Page
          </Link>
          <Link 
            to="/about" 
            className="text-xl text-gray-300 font-semibold hover:text-purple-500 transition-colors duration-300"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-xl text-gray-300 font-semibold hover:text-purple-500 transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
