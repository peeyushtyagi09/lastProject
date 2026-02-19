import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-2">Welcome</h1>
        <p className="text-lg text-gray-700 mb-6">Simple Auth System</p>
        <div className="flex space-x-4 w-full justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
