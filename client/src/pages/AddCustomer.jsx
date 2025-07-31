import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const AddCustomer = () => {
    const [formData, setFormData] = useState({
        customer_name: "",
        phone_no: "",
        due_amount: ""
    });
    const [error, setError] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const user_id = localStorage.getItem("user_id");
            if (!formData.customer_name || !formData.due_amount || !formData.phone_no) {
                return alert("All Fields are Mandatory")
            }
            const response = await fetch('http://localhost:5001/addcustomer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, user_id })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Customer added successfully");
                navigate('/viewDues');
            } else {
                setError(data.message || "Failed to add customer")
            }
        } catch (err) {
            setError(data.message || "Something went wrong")
        }
    };

    if (error) {
        return (
            <ErrorPage
                errorTitle={error}
                navigater="/dashboard"
                buttonName="Back to Dashboard"
            />
        );
    }


    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-6">
                    <Link to='/dashboard' className="flex items-center gap-2 text-black hover:text-gray-600">
                        <ArrowLeft size={24} />
                        <h2 className="text-2xl font-bold ml-2">Add Customer</h2>
                    </Link>
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                        Name :
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
                    <label htmlFor="phone" className="block text-gray-700 mb-2">
                        Phone No :
                    </label>
                    <input
                        type="tel"
                        name="phone_no"
                        value={formData.phone_no}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                        maxLength={10}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="dueMoney" className="block text-gray-700 mb-2">
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

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add Customer
                </button>
            </div>
        </div>
    );
};

export default AddCustomer;