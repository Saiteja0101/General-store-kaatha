import React, { useState,useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const RemoveorEdit = () => {
    const [formData, setFormData] = useState({
        phone_no: "",
        addorSub: "+ADD",
        due_amount: ""
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate()
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
            if (!formData.addorSub || !formData.due_amount || !formData.phone_no) {
                return alert("All Fields are Mandatory")
            }
            const response = await fetch('http://localhost:5001/updatecustomer', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, user_id })
            })
            const data = await response.json()
            if (response.ok) {
                alert("Due Amount updated Successfully")
                navigate('/dashboard')
            } else {
                setError(data.message || "Failed to update customer dues or Customer not Found")
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
                <Link to='/dashboard' className="flex gap-2">
                    <ArrowLeft size={24} className='text-black mt-1' />
                    <h2 className="text-2xl font-bold text-center mb-4"> Update Customer Dues</h2>
                </Link>
                <div className="mb-4">
                    <label htmlFor="phone_no" className="block text-gray-700">Phone No : </label>
                    <input
                        type="tel"
                        className="w-full p-2 border rounded-md"
                        name="phone_no"
                        value={formData.phone_no}
                        onChange={handleChange}
                        maxLength={10}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="addorSub" className="block text-gray-700">Add or Sub : </label>
                    <select
                        className="w-full p-2 border rounded-md"
                        name="addorSub"
                        value={formData.addorSub}
                        onChange={handleChange}
                    >
                        <option value="+ADD">+ ADD</option>
                        <option value="-SUB">- SUB</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="due_amount" className="block text-gray-700">Due Money : </label>
                    <input
                        type="tel"
                        className="w-full p-2 border rounded-md"
                        name="due_amount"
                        value={formData.due_amount}
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
                        Update Due Money
                    </button>

                </div>
            </div>
        </div>
    );
};

export default RemoveorEdit;
