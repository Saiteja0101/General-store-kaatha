import React from 'react'
import { useState, useEffect } from 'react';
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import ErrorPage from '../ErrorPage';

const ViewMyDues = () => {
    const [viewDues, setViewDues] = useState([]);
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const customer_id = localStorage.getItem("authentication-id");
    useEffect(() => {
        if (!customer_id) {
            navigate('/customer/login');
        } else {
            checkDues();
        }
    }, [navigate, customer_id]);

    const checkDues = async () => {
        //const localUrl = "http://localhost:5001/"
        try {
            const response = await fetch(`https://general-store-kaatha-production.up.railway.app/customer/viewdues?customer_id=${customer_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })

            const data = await response.json()
            if (response.ok) {
                setViewDues(data.data)
            } else {
                setError(data.message || "Failed to display dues")
            }
        } catch (error) {
            setError(error.message || "Something went wrong")
        }
    };

    if (error) {
        return (
            <ErrorPage
                errorTitle={error}
                navigater="/customer/dashboard"
                buttonName="Back to Dashboard"
            />
        );
    }
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="mb-6">
                    <Link to="/customer/dashboard" className="flex items-center gap-2 text-gray-800 hover:text-black">
                        <ArrowLeft size={24} />
                        <h2 className="text-2xl font-bold ml-2">View Dues</h2>
                    </Link>
                </div>
                {viewDues.length > 0 && (
                    <Link to='/customer/dashboard' className="flex gap-2">
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-5 rounded-md hover:bg-green-700"
                        >
                            Back
                        </button>
                    </Link>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md">
                {viewDues.length === 0 ? (
                    <div className="p-6 text-gray-500 text-center">No outstanding dues found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-3">Due Amount</th>
                                    <th className="border p-3">Store Name</th>
                                    <th className="border p-3">Last Updated Due</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewDues.map((due, index) => (
                                    <tr key={due._id || index} className="font-medium sm:text-lg text-sm hover:bg-gray-50">
                                        <td className="border p-3 text-red-600 font-bold">₹{due.dueAmount}</td>
                                        <td className="border p-3">{due.storeName}</td>
                                        <td className="border p-3">
                                            {new Date(due.lastUpdated || due.updatedAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewMyDues