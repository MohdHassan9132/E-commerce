import { useContext, useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaUser, FaBars, FaTimes, FaCaretDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const Header = () => {
  const { userDoc, isSeller, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setMobileMenuOpen(false);
    // Optionally close dropdown on route change:
    setDropdownOpen(false);
  }, [location]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={`bg-gradient-to-r from-green-900 to-green-800 sticky top-0 z-50 w-full ${scrolled ? 'shadow-lg' : ''} transition-shadow duration-300`}>
      <div className="container mx-auto max-w-6xl px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide flex items-center text-white shrink-0">
            <span className="text-yellow-400 mr-1">A</span>lbaan Foods
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-yellow-400 transition-colors p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 flex-1 justify-end">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-4 pr-10 text-black rounded-md border-2 border-green-700 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-sm"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700 hover:text-yellow-500 transition-colors"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </form>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link 
                to="/products" 
                className="text-white font-medium hover:text-yellow-400 transition-colors"
              >
                Products
              </Link>
              
{/* Account Dropdown using click */}
<div className="relative">
  <button 
    onClick={toggleDropdown}
    className="text-white font-medium hover:text-yellow-400 transition-colors flex items-center gap-2"
    aria-label="Account options"
  >
    <FaUser />
    <span className="hidden lg:inline">
      {userDoc ? userDoc.name.split(' ')[0] : "Account"}
    </span>
    <FaCaretDown 
      className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
    />
  </button>
  {dropdownOpen && (
    <div className="absolute right-0 top-full bg-white shadow-xl rounded-lg min-w-[220px] mt-2 overflow-hidden z-50">
      <div className="flex flex-col py-1 text-gray-800">
        {userDoc ? (
          <>
            <div className="px-6 py-3 border-b border-gray-100 font-semibold text-green-800">
              {userDoc.name}
            </div>
            <Link to="/profile" className="hover:bg-gray-100 px-6 py-2 text-green-800">Profile</Link>
            <Link to="/orders" className="hover:bg-gray-100 px-6 py-2 text-green-800">My Orders</Link>
            {isSeller && (
              <>
                <Link to="/addproducts" className="hover:bg-gray-100 px-6 py-2 text-green-800">Add Products</Link>
                <Link to="/adminorders" className="hover:bg-gray-100 px-6 py-2 text-green-800">Admin Orders</Link>
              </>
            )}
            <button 
              onClick={logout} 
              className="text-red-600 hover:bg-gray-100 px-6 py-2 border-t border-gray-100 mt-1 mx-auto"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:bg-gray-100 px-6 py-3 text-green-800 font-medium">Login</Link>
            <Link to="/signup" className="hover:bg-gray-100 px-6 py-3 text-green-800">Create Account</Link>
          </>
        )}
      </div>
    </div>
  )}
</div>

              {/* Cart Icon */}
              <Link to="/cart" className="relative text-white text-xl hover:text-yellow-400 transition-colors">
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} mt-4 pb-2`}>
          <form onSubmit={handleSearch} className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-4 pr-10 text-black rounded-md border-2 border-green-700 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700 hover:text-yellow-500 transition-colors"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </form>
          
          <div className="flex flex-col space-y-2 border-t border-green-700 pt-3">
            <Link 
              to="/products" 
              className="text-white font-medium py-2 hover:bg-green-700 rounded px-2"
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className="text-white font-medium py-2 hover:bg-green-700 rounded px-2 flex items-center justify-between"
            >
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {userDoc ? (
              <>
                <Link to="/profile" className="text-white font-medium py-2 hover:bg-green-700 rounded px-2">Profile</Link>
                <Link to="/orders" className="text-white font-medium py-2 hover:bg-green-700 rounded px-2">My Orders</Link>
                {isSeller && (
                  <>
                    <Link to="/addproducts" className="text-white font-medium py-2 hover:bg-green-700 rounded px-2">Add Products</Link>
                    <Link to="/adminorders" className="text-white font-medium py-2 hover:bg-green-700 rounded px-2">Admin Orders</Link>
                  </>
                )}
                <button 
                  onClick={logout} 
                  className="text-red-300 font-medium py-2 hover:bg-green-700 rounded px-2 text-left border-t border-green-700 mt-1 mx-auto"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white font-medium py-2 hover:bg-green-700 rounded px-2">Login</Link>
                <Link to="/signup" className="text-white font-medium py-2 hover:bg-green-700 rounded px-2">Create Account</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
