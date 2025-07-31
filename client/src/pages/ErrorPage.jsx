import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const ErrorPage = ({errorTitle, navigater, buttonName}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <AlertCircle size={60} className="text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{errorTitle}</h1>
      <p className="text-gray-600 text-center mb-6">
        
      </p>
      <button
        onClick={() => navigate(navigater)}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {buttonName}
      </button>
    </div>
  );
};

export default ErrorPage;
