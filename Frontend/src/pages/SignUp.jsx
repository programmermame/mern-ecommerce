/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion"; // Importing Framer Motion
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // To handle HTTP requests

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Handle sign-up
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://pick-out-backend-service-on-render.onrender.com/api/auth/register", {
                name,
                email,
                password,
            });

            // Show a success toast (optional)

            // Navigate to the login page after successful signup
            navigate("/login");
        } catch (error) {
            // Show an error toast if signup fails
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <motion.div
                className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }} // Initial state (offscreen and scaled down)
                animate={{ opacity: 1, scale: 1 }} // Animate to center and normal size
                transition={{ duration: 0.6, ease: "easeOut" }} // Easing and duration
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Sign Up
                </h2>
                <form onSubmit={handleSubmit}>
                    <motion.input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 mb-4 border rounded-md"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        initial={{ x: -50, opacity: 0 }} // Slide in from left
                        animate={{ x: 0, opacity: 1 }} // Move to normal position
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 border rounded-md"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        initial={{ x: -50, opacity: 0 }} // Slide in from left
                        animate={{ x: 0, opacity: 1 }} // Move to normal position
                        transition={{ duration: 0.6, delay: 0.4 }}
                    />
                    <motion.input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-6 border rounded-md"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        initial={{ x: -50, opacity: 0 }} // Slide in from left
                        animate={{ x: 0, opacity: 1 }} // Move to normal position
                        transition={{ duration: 0.6, delay: 0.6 }}
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignUp;
