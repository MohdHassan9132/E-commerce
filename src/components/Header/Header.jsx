import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { cart } = useContext(CartContext);

  return (
    <header className="bg-yellow-500 shadow-lg p-4 flex justify-between items-center text-white">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform"
      >
        Albaan Dairy Foods
      </Link>

      {/* Navbar Links */}
      <nav className="flex items-center space-x-6">
        <Link
          to="/products"
          className="hover:text-gray-900 transition-colors duration-300"
        >
          Products
        </Link>
        <Link
          to="/login"
          className="hover:text-gray-900 transition-colors duration-300"
        >
          Login
        </Link>

        {/* Cart Icon with Badge */}
        <Link to="/cart" className="relative flex items-center group">
          <FaShoppingCart
            size={24}
            className="text-white group-hover:scale-110 transition-transform duration-200"
          />

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
              {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
