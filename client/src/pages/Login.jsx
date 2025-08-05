import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "../components/Home";
import ErrorPage from './ErrorPage';

const Login = () => {
  const [formData, setFormData] = useState({ phoneNo: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user_id', data.data);
        navigate('/dashboard')
      } else {
        setError(data.message || "Login failed")
      }

    } catch (error) {
      setError(error.message || "Something went wrong")
    }
  };
  if (error) {
    return (
      <ErrorPage
        errorTitle={error}
        navigater="/register"
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
            <h2 className="text-2xl font-bold text-center mb-4">LogIn</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone No</label>
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone No"
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
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
                Login
              </button>
              <Link to='/register' className="gap-2 flex justify-center">
                <h2 className="text-xs text-center mb-4 underline">Don't have an account</h2>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
