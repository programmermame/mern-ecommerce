// src/pages/Cart.js
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🛒 Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg text-gray-600 mb-4">Your cart is feeling a little empty.</p>
                    <Link
                        to="/products"
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <li key={item._id} className="flex flex-col sm:flex-row justify-between items-center py-6">
                                <div className="flex items-center gap-6">
                                    {/* Product Thumbnail */}
                                    <img
                                        src={item.imageUrl || 'https://via.placeholder.com/150'}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-0 text-right w-full sm:w-1/4">
                                    {/* Quantity Control */}
                                    <div className="flex items-center gap-4 justify-center">
                                        <button
                                            onClick={() => decreaseQuantity(item._id)}
                                            className="text-lg text-gray-500 hover:text-gray-700"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-semibold text-gray-800">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(item._id)}
                                            className="text-lg text-gray-500 hover:text-gray-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-lg font-medium text-gray-800">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 text-sm mt-1 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Cart Summary Section */}
                    <div className="border-t pt-6 mt-6 text-right">
                        <p className="text-xl font-bold text-gray-800">Total: ${total.toFixed(2)}</p>
                        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
                            <button
                                onClick={clearCart}
                                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-all w-full sm:w-auto"
                            >
                                Clear Cart
                            </button>
                            <Link to="/checkout">
                                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
