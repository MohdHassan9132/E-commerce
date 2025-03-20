import { useContext, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const Header = () => {
  const { userDoc, isSeller } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  console.log("isSeller from Context:", isSeller);
  console.log("UserDoc Role:", userDoc?.role);

  return (
    <header className="bg-green-800 shadow-lg px-6 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center text-white">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide flex items-center">
          <span className="text-yellow-400 mr-1">A</span>lbaan Foods
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className="text-yellow-400" /> : <FaBars className="text-yellow-400" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/products" className="hover:text-yellow-400">Products</Link>
          {isSeller && <Link to="/addproducts" className="hover:text-yellow-400">Add Products</Link>}
          {isSeller && <Link to="/adminorders" className="hover:text-yellow-400">Admin Orders</Link>}
          <Link to="/orders" className="hover:text-yellow-400">Orders</Link>
          {userDoc ? (
            <Link to="/profile" className="hover:text-yellow-400">{userDoc.name}</Link>
          ) : (
            <Link to="/login" className="hover:text-yellow-400">Login</Link>
          )}
          {/* Cart with Counter */}
          <Link to="/cart" className="relative flex items-center">
            <FaShoppingCart className="text-xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-green-900 bg-opacity-95 z-40 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setMenuOpen(false)} className="text-3xl text-yellow-400">
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-6 text-lg text-white">
          <Link to="/products" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          {isSeller && (
            <Link to="/addproducts" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
              Add Products
            </Link>
          )}
           {isSeller && (
            <Link to="/adminorders" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
              Admin Orders
            </Link>
          )}
          <Link to="/orders" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
            Orders
          </Link>
          {userDoc ? (
            <Link to="/profile" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
              {userDoc.name}
            </Link>
          ) : (
            <Link to="/login" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
          {/* Mobile Cart with Counter */}
          <Link to="/cart" className="relative flex items-center space-x-2" onClick={() => setMenuOpen(false)}>
            <FaShoppingCart className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
