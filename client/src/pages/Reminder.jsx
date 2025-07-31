import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Reminder = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    phone_no: "",
    due_amount: ""
  });
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    if (!user_id) {
      return navigate('/')
    }

  }, [])
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.customer_name || !formData.due_amount || !formData.phone_no) {
      return alert("All Fields are Mandatory")
    }
    const message = `Hi ${formData.customer_name}, your payment of ₹${formData.due_amount} is due. Please pay soon!`;
    console.log("Sending reminder to:", formData.phone_no);
    console.log("Message:", message);
    // Add your sendSMS function here
    // start from here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6">
          <Link to='/dashboard' className="flex items-center gap-2 text-black hover:text-gray-600">
            <ArrowLeft size={24} />
            <h2 className="text-2xl font-bold ml-2">Send reminder Dues</h2>
          </Link>
        </div>

        <div className="mb-4">
          <label htmlFor="customer_name" className="block text-gray-700 mb-2">
            Customer Name :
          </label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone_no" className="block text-gray-700 mb-2">
            Phone No :
          </label>
          <input
            type="tel"
            name="phone_no"
            value={formData.phone_no}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            title="10-digit phone number"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="due_amount" className="block text-gray-700 mb-2">
            Due Amount (₹) :
          </label>
          <input
            type="number"
            name="due_amount"
            value={formData.due_amount}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex gap-2">
          {/*back to owner dashboard */}
          <Link to='/dashboard' className="flex gap-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Back
            </button>
          </Link>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Send reminder
          </button>

        </div>
      </div>
    </div>
  );
};

export default Reminder;
