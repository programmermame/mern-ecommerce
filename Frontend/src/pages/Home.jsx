/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard.jsx"; // Import your ProductCard component
import { Link } from "react-router-dom"; // Import Link for navigation
import { motion } from "framer-motion"; // Import framer-motion for animations

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                setProducts(response.data.message.slice(0, 4)); // Limit to 5 products
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Hero Section Animations
    const heroTextVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    // Shop Now Button Animation
    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: "easeOut" } },
    };

    // Product Animation
    const productVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="min-h-screen bg-gray-50  ">
            {/* Hero Banner Section */}
            <motion.section
                className="relative text-white text-center py-40 rounded-2xl"
                style={{
                    backgroundImage: "url('https://media.istockphoto.com/id/1772604575/photo/fragrance-spray-man-and-perfume-applying-cologne-scent-water-skin-care-beauty-product-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=5FIidS40BeICkG0swLERiQ2N47iD33eGIevjHKkeJnM=')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                initial="hidden"
                animate="visible"
                variants={heroTextVariants}
            >
                {/* Opacity Overlay */}
                <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div> {/* Overlay with opacity */}

                <motion.h1 className="relative text-5xl font-bold leading-tight mb-4 z-10" variants={heroTextVariants}>
                    Welcome to Our Exclusive Collection
                </motion.h1>
                <motion.p className="relative text-xl mb-8 z-10" variants={heroTextVariants}>
                    Discover top-quality products at unbeatable prices!
                </motion.p>
                <motion.div variants={buttonVariants}>
                    <Link
                        to="/products"
                        className="relative bg-white text-blue-900 py-4 px-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300 z-10"
                    >
                        Shop Now
                    </Link>
                </motion.div>
            </motion.section>

            {/* Featured Products Section */}
            <section className="py-16 px-6">
                <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
                    Featured Products
                </h2>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <motion.div
                        className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    delayChildren: 0.3,
                                    staggerChildren: 0.3,
                                },
                            },
                        }}
                    >
                        {Array.isArray(products) &&
                            products.map((product) => (
                                <motion.div
                                    key={product._id}
                                    variants={productVariants}
                                    className="transition-all duration-300 transform hover:scale-105"
                                >
                                    <ProductCard key={product._id} product={product} />
                                </motion.div>
                            ))}
                    </motion.div>
                )}
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="text-center">
                    <p>&copy; 2025 Pickout Store. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
