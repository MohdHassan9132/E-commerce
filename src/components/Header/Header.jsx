import { useContext, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const Header = () => {
  const { user, userDoc, isSeller } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <header className="bg-green-800 shadow-lg px-6 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center text-white">
        <Link to="/" className="text-2xl font-bold tracking-wide flex items-center">
          <span className="text-yellow-400 mr-1">A</span>lbaan Foods
        </Link>
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className="text-yellow-400" /> : <FaBars className="text-yellow-400" />}
        </button>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/products">Products</Link>
          {isSeller && <Link to="/addproducts">Add Products</Link>}
          <Link to="/orders">Orders</Link>
          {user ? (
            <Link to="/profile">{userDoc?.name || user?.name}</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/cart">
            <FaShoppingCart />{" "}
            {cartItemCount > 0 && <span>{cartItemCount}</span>}
          </Link>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-800 px-6 py-4">
          <nav className="flex flex-col space-y-2">
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            {isSeller && (
              <Link to="/addproducts" className="hover:underline">
                Add Products
              </Link>
            )}
            <Link to="/orders" className="hover:underline">
              Orders
            </Link>
            {user ? (
              <Link to="/profile" className="hover:underline">
                {userDoc?.name || user?.name}
              </Link>
            ) : (
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            )}
            <Link to="/cart" className="hover:underline flex items-center">
              <FaShoppingCart className="mr-1" />{" "}
              {cartItemCount > 0 && <span>{cartItemCount}</span>}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
