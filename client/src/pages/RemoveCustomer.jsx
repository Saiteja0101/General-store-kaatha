import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const RemoveorEdit = () => {
    const navigate = useNavigate()
    const [phone_no, setPhone_no] = useState("");
    const [error, setError] = useState(null);
    const user_id = localStorage.getItem("user_id");
    useEffect(() => {
        if (!user_id) {
            return navigate('/owner/login')
        }

    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        //const localUrl = "http://localhost:5001/"
        try {
            if (!phone_no) {
                return alert("All Fields are Mandatory")
            }
            const response = await fetch('https://general-store-kaatha.onrender.com/owner/removecustomer', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_no, user_id })
            })
            const data = await response.json()
            if (response.ok) {
                alert("customer removed successfully: ")
                navigate('/owner/dashboard')
            } else {
                setError(data.message || "Customer not found")
            }
        } catch (err) {
            setError(err.message || "Something went wrong")
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
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <Link to='/owner/dashboard' className="flex gap-2">
                    <ArrowLeft size={24} className='text-black mt-1' />
                    <h2 className="text-2xl font-bold text-center mb-4">Remove Customer</h2>
                </Link>
                <div className="mb-4">
                    <label htmlFor="phone_no" className="block text-gray-700">Phone No : </label>
                    <input
                        type="tel"
                        className="w-full p-2 border rounded-md"
                        name="phone_no"
                        value={phone_no}
                        onChange={(e) => setPhone_no(e.target.value)}
                        maxLength={10}
                        required
                    />
                </div>

                <div className="flex gap-2">
                    {/* Bck to owner dashboard */}
                    <Link to='/owner/dashboard' className="flex gap-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                        >
                            Back
                        </button>
                    </Link>

                    <button
                        // remove customer if dues become zero
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    >
                        Remove customer
                    </button>

                </div>
            </div>
        </div>
    );
};

export default RemoveorEdit;
