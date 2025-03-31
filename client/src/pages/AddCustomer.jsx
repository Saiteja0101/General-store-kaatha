import React, { useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

const AddCustomer = () => {
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phone: "", 
        dueMoney: "" 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        try {
            // Convert dueMoney to number
            const dueAmount = parseFloat(formData.dueMoney);
            if (isNaN(dueAmount) || dueAmount <= 0) {
                alert("Please enter a valid due amount");
                return;
            }

            // Get existing dues
            const existingDues = JSON.parse(localStorage.getItem("dues")) || [];
            
            // Create new due entry
            const newDue = {
                id: Date.now(),
                ...formData,
                dueMoney: dueAmount // Store as number
            };

            // Save updated list
            localStorage.setItem("dues", JSON.stringify([...existingDues, newDue]));
            
            // Clear form and navigate
            setFormData({ name: "", email: "", phone: "", dueMoney: "" });
            navigate("/viewDues");
            
        } catch (error) {
            console.error("Error saving customer:", error);
            alert("Failed to save customer. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-6">
                    <Link to='/ownerDashboard' className="flex items-center gap-2 text-black hover:text-gray-600">
                        <ArrowLeft size={24} />
                        <h2 className="text-2xl font-bold ml-2">Add Customer</h2>
                    </Link>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            title="10-digit phone number"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dueMoney" className="block text-gray-700 mb-2">
                            Due Amount (₹)
                        </label>
                        <input
                            type="number"
                            id="dueMoney"
                            name="dueMoney"
                            value={formData.dueMoney}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Add Customer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCustomer;