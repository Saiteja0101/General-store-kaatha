import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ViewDues = () => {
    const [viewDues, setViewDues] = useState([]);

    useEffect(() => {
        // Retrieve dues from local storage safely
        try {
            const storedDues = JSON.parse(localStorage.getItem("dues")) || [];
            setViewDues(storedDues);
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            setViewDues([]);
        }
    }, []);

    const clearAllDues = () => {
        // Clear dues from both state and local storage
        localStorage.removeItem("dues");
        setViewDues([]);
        alert("All dues cleared successfully!");
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="mb-6">
                    <Link to='/ownerDashboard' className="flex items-center gap-2 text-black hover:text-gray-600">
                        <ArrowLeft size={24} />
                        <h2 className="text-2xl font-bold ml-2">View Dues</h2>
                    </Link>
                </div>
                {viewDues.length > 0 && (
                    <button
                        onClick={clearAllDues}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Clear All Dues
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {viewDues.length === 0 ? (
                    <div className="p-6 text-gray-500 text-center">
                        No outstanding dues found
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {viewDues.map((due, index) => (
                            <li
                                key={due.id || index}
                                className="p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{due.name}</h3>
                                        <p className="text-sm text-gray-600">{due.email}</p>
                                        <p className="text-sm text-gray-600">{due.phone}</p>
                                        <p className="text-sm text-gray-600">{Date}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-red-600">
                                            ₹{due.dueMoney.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ViewDues;