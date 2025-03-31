import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between">
        <h1 className="text-xl font-bold flex gap-1">
          <Link to='/home'>
            <ArrowLeft size={24} className='text-white mt-0.5' />
          </Link>
          Owner Dashboard
        </h1>
        <Link to="/" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
          Logout
        </Link>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome, Store Owner</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add New Customer */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Add Customer</h3>
            <p className="text-gray-600">Register a new customer with their phone number & email.</p>
            <Link to="/addCustomer" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Add Customer
            </Link>
          </div>
          {/* Remove or update customer */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Remove / Update Customer</h3>
            <p className="text-gray-600">Remove an existing customer if dues becomes zero or update dues of a customer.</p>
            <Link to="/removeOrEdit" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Remove / Update
            </Link>
          </div>

          {/* View Dues */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">View Dues</h3>
            <p className="text-gray-600">Check pending payments from customers.</p>
            <Link to="/viewDues" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              View Dues
            </Link>
          </div>

          {/* Send Reminders */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Send Reminders</h3>
            <p className="text-gray-600">Automatically notify customers about their dues.</p>
            <Link to="/send-reminders" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Send Reminders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;