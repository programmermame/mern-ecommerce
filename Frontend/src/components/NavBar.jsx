// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // ✅ import useCart

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();

  // ✅ Dynamically calculate total quantity across all cart items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-blue-900 p-4 text-white">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-semibold text-xl">
          Pickout Store
        </Link>

        <div className="flex items-center gap-4">
          {/* ✅ Cart Icon */}
          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1.5 py-0.5 rounded-full text-white font-semibold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* ✅ Auth Buttons */}
          {user ? (
            <>
              <Link to="/profile" className="mr-2">Profile</Link>
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-2">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
