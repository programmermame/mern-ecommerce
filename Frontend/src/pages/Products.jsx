import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard.jsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                setProducts(response.data.message); // Set the products
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12 lg:px-24">
            {/* Heading Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Explore Our Featured Products
                </h1>
                <p className="text-lg text-gray-500 mt-4">
                    Discover the best deals and shop for quality products at the best prices.
                </p>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.isArray(products) &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>
            )}
        </div>
    );
};

export default Products;
