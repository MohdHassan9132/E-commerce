import React, { useContext, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-yellow-500 shadow-lg px-6 py-4 flex justify-between items-center text-white relative">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform"
      >
        Albaan Dairy Foods
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navbar Links */}
      <nav
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-yellow-500 md:flex items-center space-x-6 md:space-x-6 px-6 py-4 md:p-0 transition-all ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <Link
          to="/products"
          className="block md:inline-block py-2 hover:text-gray-900 transition-colors duration-300"
          onClick={() => setMenuOpen(false)}
        >
          Products
        </Link>
        <Link
          to="/login"
          className="block md:inline-block py-2 hover:text-gray-900 transition-colors duration-300"
          onClick={() => setMenuOpen(false)}
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
