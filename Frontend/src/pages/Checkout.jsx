/* eslint-disable no-unused-vars */
// src/pages/Checkout.jsx
import React, { useContext, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect to cart if empty
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/cart");
        }
    }, [cartItems, navigate]);

    const handleCheckout = async () => {
        try {
            if (!user || !user._id) {
                navigate("/login");
                return;
            }

            // 1. Create order in backend
            const orderResponse = await axios.post("https://pick-out-backend-service-on-render.onrender.com/api/orders", {
                user: user._id,
                products: cartItems.map(item => ({
                    productId: item._id,
                    quantity: item.quantity,
                })),
            });

            const { order } = orderResponse.data;

            // 2. Get Stripe checkout session
            const sessionResponse = await axios.post("https://pick-out-backend-service-on-render.onrender.com/api/create-checkout-session", {
                orderId: order._id,
            });

            // 3. Redirect to Stripe Checkout
            window.location.href = sessionResponse.data.url;

        } catch (err) {
            console.error("Checkout failed", err);
            alert("Something went wrong during checkout. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">🧾 Checkout Summary</h2>

                <ul className="divide-y divide-gray-200 mb-6">
                    {cartItems.map(item => (
                        <li key={item._id} className="flex justify-between py-4">
                            <span>{item.name} × {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>

                <div className="text-right text-lg font-semibold text-gray-800 mb-4">
                    Total: $
                    {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </div>

                <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Proceed to Payment 💳
                </button>
            </div>
        </div>
    );
};

export default Checkout;
