import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { ArrowLeft } from "lucide-react";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({ username: "", email: "", phoneNo: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { username, phoneNo, password, email } = formData;
  // handleRegister
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if(!username || !email || !phoneNo || !password){
        return alert('All fields are mandatory')
      }

      //const localUrl = "http://localhost:5001/"
      const response = await fetch('https://general-store-kaatha.onrender.com/auth/customer/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
  
      const data = await response.json()
  
      if(!response.ok){
        return setError(data.message || "Register failed")
      }
  
      localStorage.setItem('authentication-id', data.data)
      navigate('/customer/dashboard')
    } catch (error) {
      setError(error.message || 'Something went wrong')
    }

  };
  if (error) {
    return (
      <ErrorPage
        errorTitle={error}
        navigater="/customer/login"
        buttonName="Go back"
      />
    );
  }



  return (
    <>
      <nav className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-100 hover:text-white">
            <ArrowLeft size={24} />
            <h1 className="text-xl font-bold">General Store Kaatha</h1>
          </Link>
        </div>
      </nav>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto text-center py-20 px-4">
          <h2 className="text-4xl font-bold mb-4">Check your dues from all stores in one place</h2>
          <p className="text-lg text-gray-700 mb-6">
            The customer can view all the pending dues they have across different stores in one place.
          </p>
        </div>
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your full name"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
              >
                Register
              </button>
              <Link to='/customer/login' className="gap-2 flex justify-center mt-1">
                <h2 className="text-xs text-center mb-4 underline">Already have an account? <span className="font-bold text-blue-600">LogIn</span></h2>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerRegister;
