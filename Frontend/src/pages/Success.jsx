// src/pages/Success.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from "../context/CartContext";


const Success = () => {
    const { clearCart } = useCart();

    const [paymentStatus, setPaymentStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Use URLSearchParams to extract session_id from query params
    const searchParams = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get('session_id'); // This should get the session_id from the URL

    useEffect(() => {
        const verifyPayment = async () => {
            if (sessionId) {
                try {
                    const response = await axios.post('https://pick-out-backend-service-on-render.onrender.com/api/verify-session', { sessionId });
                    const status = response.data.status;

                    if (status === 'succeeded') {
                        clearCart();
                        setPaymentStatus('Payment Successful!');
                    } else {
                        setPaymentStatus('Payment Failed.');
                    }
                } catch (error) {
                    console.error('Error verifying payment:', error);
                    setPaymentStatus('There was an error verifying the payment.');
                } finally {
                    setLoading(false);
                }
            } else {
                setPaymentStatus('No session ID found.');
                setLoading(false);
            }
        };

        verifyPayment();
    }, [sessionId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Thank You for Your Payment!</h1>

                <p className="text-lg text-center mb-4">{paymentStatus}</p>

                <div className="text-center">

                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 ml-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Success;
