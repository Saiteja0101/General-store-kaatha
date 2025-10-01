import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";

const CustomerDashboard = () => {
  const [username, setUsername] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const customer_id = localStorage.getItem('authentication-id')
  
  
  const getUsername = async () => {
    
    //const localUrl = "http://localhost:5001/"
    try {
      const response = await fetch(`https://general-store-kaatha.onrender.com/customer/dashboard?customer_id=${customer_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (!response.ok) {
        return setError(data.message || "user name not found")
      }
      setUsername(data.data)
    } catch (err) {
      setError(err.message || "Something went wrong")
    }
  }
  if (error) {
    return (
      <ErrorPage
      errorTitle={error}
      navigater="/customer/login"
      buttonName="Back to login page"
      />
    );
  }

  // useEffect is for if user try to redirect to the dashboard without login it will redirect to login page
  useEffect(() => {
    if (!customer_id) {
      navigate('/customer/login')
    } else {
      getUsername();
    }
  }, [customer_id, navigate]);

  // clearing authentication-id after logout
  const handleLogout = () => {
    localStorage.removeItem('authentication-id')
    navigate('/customer/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 shadow-md flex justify-between">
        <h1 className="text-xl font-bold">Customer Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-green-600 px-4 py-2 font-semibold rounded-md hover:bg-gray-200">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-green-700">
          👋 Welcome, <span className="text-gray-800 decoration-green-500">{username}</span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* View Dues */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">View Your Dues</h3>
            <p className="text-gray-600">Check your pending payments.</p>
            <button 
            onClick={() => navigate('/customer/viewdues')}
            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              View Dues
            </button>
          </div>

          {/* Payment History */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Payment History</h3>
            <p className="text-gray-600">Track your past payments.</p>
            <button 
            onClick={() => {return alert("View history currently not completed")}}
            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
