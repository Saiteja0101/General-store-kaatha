import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">General Store Kaatha</h1>
          <div>
            <Link to="/">
              <button className="bg-white text-blue-600 font-bold px-4 py-2 rounded-md mr-2 hover:bg-gray-200 cursor-pointer">
                LogOut
              </button>
            </Link>
            
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-4">Manage Customer Dues Effortlessly</h2>
        <p className="text-lg text-gray-700 mb-6">
          Store owners can keep track of dues, send automatic reminders, and customers can check their pending payments online.
        </p>
        <div className="grid md:grid-cols-2 justify-center gap-4">
          <Link to="/ownerDashboard">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              I'm a Store Owner
            </button>
          </Link>
          <Link to="/customerDashboard">
            <button className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              I'm a Customer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
