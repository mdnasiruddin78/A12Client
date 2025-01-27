import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import '../Components/index/index.css';
import React from "react";


const Error = () => {
    return (
        <div className='flex justify-center items-center flex-col space-y-3 p-10'>
            <Helmet>
                <title>BlogSpace | ErrorPage</title>
            </Helmet>
            <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-blue-600">404</h1>
                    <p className="mt-4 text-2xl font-semibold text-gray-800">
                        Oops! Page not found.
                    </p>
                    <p className="mt-2 text-lg text-gray-600">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Error;