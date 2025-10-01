import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const ViewDues = () => {
    const [viewDues, setViewDues] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const user_id = localStorage.getItem("user_id");
    useEffect(() => {
        if (!user_id) {
            navigate('/owner/login');
        }else{
            viewDue()
        }
    }, [navigate, user_id]);
    const viewDue = async () => {
        //const localUrl = "http://localhost:5001/"
        try {
            const response = await fetch(`https://general-store-kaatha.onrender.com/owner/viewdues?user_id=${user_id}`, {
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
                navigater="/owner/dashboard"
                buttonName="Back to Dashboard"
            />
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="mb-6">
                    <Link to="/owner/dashboard" className="flex items-center gap-2 text-black">
                        <ArrowLeft size={24} />
                        <h2 className="text-2xl font-bold ml-2">View Dues</h2>
                    </Link>
                </div>
                {viewDues.length > 0 && (
                    <Link to='/owner/dashboard' className="flex gap-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700"
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
                                    <th className="border p-3">Name</th>
                                    <th className="border p-3">Phone No</th>
                                    <th className="border p-3">Due Amount</th>
                                    <th className="border p-3">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewDues.map((due, index) => (
                                    <tr key={due.id || index} className="font-medium sm:text-lg text-sm hover:bg-gray-50">
                                        <td className="border p-3">{due.customerName}</td>
                                        <td className="border p-3">{due.phoneNo}</td>
                                        <td className="border p-3 text-red-600 font-bold">₹{due.dueAmount}</td>
                                        <td className="border p-3">{new Date(due.lastUpdated).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewDues;
