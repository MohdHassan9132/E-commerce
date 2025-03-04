import React, { useContext, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-800 shadow-lg px-6 py-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center text-white">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide flex items-center"
          >
            <span className="text-yellow-400 mr-1">A</span>lbaan Foods
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <FaTimes className="text-yellow-400" />
            ) : (
              <FaBars className="text-yellow-400" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/products"
              className="hover:text-yellow-400 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/login"
              className="hover:text-yellow-400 transition-colors"
            >
              Login
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <FaShoppingCart size={20} className="text-white" />
              </div>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden mt-4 py-2 border-t border-green-700">
            <div className="flex flex-col items-center space-y-3 text-white">
              <Link
                to="/products"
                className="flex items-center space-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <span>Products</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center space-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <span>Login</span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center space-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <FaShoppingCart size={20} />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
