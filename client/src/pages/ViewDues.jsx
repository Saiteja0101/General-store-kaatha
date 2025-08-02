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
            return navigate('/')
        }

    }, [])
    const viewDue = async () => {
        try {
            const response = await fetch(`http://localhost:5001/viewdues?user_id=${user_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })

            const data = await response.json()
            if (response.ok) {
                setViewDues(data)
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
                navigater="/dashboard"
                buttonName="Back to Dashboard"
            />
        );
    }


    useEffect(() => {
        viewDue();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="mb-6">
                    <Link to="/dashboard" className="flex items-center gap-2 text-black hover:text-gray-600">
                        <ArrowLeft size={24} />
                        <h2 className="text-2xl font-bold ml-2">View Dues</h2>
                    </Link>
                </div>
                {viewDues.length > 0 && (
                    <Link to='/dashboard' className="flex gap-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
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
                        <table className="min-w-full border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-3 text-left">Name</th>
                                    <th className="border p-3 text-left">Phone No</th>
                                    <th className="border p-3 text-left">Due Amount</th>
                                    <th className="border p-3 text-left">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewDues.map((due, index) => (
                                    <tr key={due.id || index} className="hover:bg-gray-50">
                                        <td className="border p-3">{due.customer_name}</td>
                                        <td className="border p-3">{due.phone_no}</td>
                                        <td className="border p-3 text-red-600 font-bold">₹{due.due_amount}</td>
                                        <td className="border p-3">{new Date(due.last_updated).toLocaleString()}</td>
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
