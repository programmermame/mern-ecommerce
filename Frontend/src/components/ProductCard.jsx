/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Optional for smooth effects
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
    const [isInCart, setIsInCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Check if the product is already in the cart
    useEffect(() => {
        const itemInCart = cartItems.find((item) => item._id === product._id);
        if (itemInCart) {
            setIsInCart(true);
            setQuantity(itemInCart.quantity); // Set quantity from the cart
        } else {
            setIsInCart(false);
            setQuantity(1); // Reset quantity if not in the cart
        }
    }, [cartItems, product._id]);

    // Add product to the cart
    const handleAddToCart = () => {
        addToCart(product);
    };

    // Handle increase and decrease quantity
    const handleIncrease = () => {
        increaseQuantity(product._id);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            decreaseQuantity(product._id);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
        >
            <div className="w-full">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                        {product.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-blue-900 font-bold text-lg">
                            ${product.price}
                        </span>

                        {/* Show different buttons based on if the product is in the cart */}
                        {!isInCart ? (
                            <button
                                className="px-3 py-1 bg-blue-900 text-white text-sm rounded hover:bg-blue-700 transition"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleDecrease}
                                    className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                                >
                                    -
                                </button>
                                <span className="text-sm">{quantity}</span>
                                <button
                                    onClick={handleIncrease}
                                    className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
