import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const OwnerDashboard = () => {
  const cards = [
    {
      title: 'Add Customer',
      description: 'Register a new customer with their phone number & email.',
      link: 'addCustomer'
    },
    {
      title: 'Remove Customer',
      description: 'Remove an existing customer if dues becomes zero or update dues of a customer.',
      link: 'removeCustomer'
    },
    {
      title: 'Update Customer Dues',
      description: ' update customer dues.',
      link: 'updateDues'
    },
    {
      title: 'View Dues',
      description: 'Check pending payments from customers.',
      link: 'viewDues'
    },
    {
      title: 'Send Reminders',
      description: 'Automatically notify customers about their dues.',
      link: 'reminder'
    },
  ]
  const [storeTitle, setStoreTitle] = useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const user_id = localStorage.getItem("user_id");

  // useEffect is for if user try to redirect to the dashboard without login it will redirect to login page
  useEffect(() => {
    if (user_id) {
      storeName();
    }
  }, [user_id]);

  const storeName = async () => {
    try {
      const response = await fetch(`http://localhost:5001/owner/dashboard?user_id=${user_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (response.ok) {
        setStoreTitle(data.data)
      } else {
        setError(data.message || "store name not found")
      }
    } catch (err) {
      setError(err.message || "Something went wrong")
    }
  }

  if (error) {
    return (
      <ErrorPage
        errorTitle={error}
        navigater="/"
        buttonName="Back to login page"
      />
    );
  }

  useEffect(() => {
    storeName();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between">
        <h1 className="text-xl font-bold flex gap-1">
          <Link to='/dashboard'>
          </Link>
          Dashboard
        </h1>
        <Link to="/" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
          Logout
        </Link>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
          👋 Welcome to <span className="text-gray-800 decoration-blue-500">{storeTitle}</span>
        </h2>


        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, id) => (
            <div key={id} className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
              <Link to={`/${card.link}`} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                {card.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;