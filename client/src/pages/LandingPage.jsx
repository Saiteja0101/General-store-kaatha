import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">General Store Due Management</h1>
          <div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-4">Manage Customer Dues Effortlessly</h2>
        <p className="text-lg text-gray-700 mb-6">
          Store owners can keep track of dues, send automatic reminders, and customers can check their pending payments online.
        </p>
        <div className="flex justify-center gap-4">
          <Link
          to = '/owner/login'
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            I'm a Store Owner
          </Link>
          <Link 
          to = '/customer/login'
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
            I'm a Customer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
