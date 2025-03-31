import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 shadow-md flex justify-between">
        <h1 className="text-xl font-bold flex gap-1">
          <Link to='/home'>
            <ArrowLeft size={24} className='text-white mt-0.5' />
          </Link>
          Customer Dashboard
        </h1>
        <Link to="/" className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-200">
          Logout
        </Link>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome, Valued Customer</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* View Dues */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">View Your Dues</h3>
            <p className="text-gray-600">Check your pending payments.</p>
            <Link to="/customer-dues" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              View Dues
            </Link>
          </div>

          {/* Payment History */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Payment History</h3>
            <p className="text-gray-600">Track your past payments.</p>
            <Link to="/payment-history" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              View History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
