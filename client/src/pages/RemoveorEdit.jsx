import React, { useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";

const RemoveorEdit = () => {
    const [phone, setPhone] = useState("");
    const [dueMoney, setDueMoney] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Customer Added:", {phone, dueMoney });
        setPhone("");
        setDueMoney("");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <Link to='/ownerDashboard' className="flex gap-2">
                    <ArrowLeft size={24} className='text-black mt-1' />
                    <h2 className="text-2xl font-bold text-center mb-4">Remove / Update Customer</h2>
                </Link>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="tel"
                            className="w-full p-2 border rounded-md"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Due Money</label>
                        <input
                            type="tel"
                            className="w-full p-2 border rounded-md"
                            value={dueMoney}
                            onChange={(e) => setDueMoney(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        {/* remove customer */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                        >
                            Remove Customer
                        </button>

                        <button
                            // update due money
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                        >
                            Update Due Money
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default RemoveorEdit;
