import React, { useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import Home from "../components/Home";
import ErrorPage from './ErrorPage'

const Register = () => {
  const [formData, setFormData] = useState({ username: "", storename: "", email: "", phoneNo: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { username, phoneNo, password, storename } = formData;
  // handleRegister
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!username || !phoneNo || !password || !storename) {
        return alert("All Fields are Mandatory")
      }
      const response = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      console.log(data);
      if (response.ok) {
        localStorage.setItem("user_id", data.model);
        navigate('/dashboard')
      } else {
        setError(data.message || "Registration failed")
      }
    } catch (err) {
      setError(err.message || "Something went wrong")
    }
  };
  if (error) {
    return (
      <ErrorPage
        errorTitle={error}
        navigater="/"
        buttonName="Go back"
      />
    );
  }



  return (
    <>
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">General Store Kaatha</h1>
        </div>
      </nav>
      <div className="bg-gray-100 min-h-screen">
        <Home />
        <div className=" flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Store Name</label>
                <input
                  type="text"
                  name="storename"
                  value={formData.storename}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="If you have a Store, Enter Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone No</label>
                <input
                  type="tel"
                  name="phoneNo"
                  maxLength={10}
                  value={formData.phoneNo}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Phone No"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  minLength={5}
                  value={formData.password}
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
              <Link to='/' className="gap-2 flex justify-center mt-1">
                <h2 className="text-xs text-center mb-4 underline">Already have an account</h2>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
