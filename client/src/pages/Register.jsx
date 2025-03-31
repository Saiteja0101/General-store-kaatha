import React, { useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("http://localhost:5000/register", formData);

          if (response.data.redirect) {
              localStorage.setItem("token", response.data.token); // Save token
              navigate(response.data.redirect);
          }
      } catch (error) {
          alert(error.response?.data?.error || "Registration failed");
      }
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">General Store Kaatha</h1>
        </div>
      </nav>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <Link to='/' className="flex gap-2">
            <ArrowLeft size={24} className='text-black mt-1' />
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          </Link>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
            <Link to='/' className="gap-2 flex justify-center">
              <h2 className="text-xs text-center mb-4 underline">Already have an account</h2>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
