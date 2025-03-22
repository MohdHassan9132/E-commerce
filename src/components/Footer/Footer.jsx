import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-green-900 to-green-800 text-white w-full mt-16 shadow-xl overflow-hidden">
      {/* Decorative elements - subtle but effective */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-5 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-400 opacity-5 rounded-full transform -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container mx-auto max-w-6xl px-6 md:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Albaan Foods</h3>
            <div className="w-20 h-1 bg-yellow-400 rounded-full mb-5"></div>
            <p className="text-gray-200 mb-6 max-w-xs">
              Providing farm-fresh dairy products and tasty foods directly to your doorstep since 2020.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="w-10 h-10 bg-green-700 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <FaFacebook className="text-white text-lg" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 bg-green-700 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <FaTwitter className="text-white text-lg" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 bg-green-700 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <FaInstagram className="text-white text-lg" />
              </a>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xl font-bold mb-5 relative inline-block pb-2">
              Contact Us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 rounded-full"></span>
            </h4>
            <div className="flex flex-col gap-4 w-full max-w-md">
              {/* Phone */}
              <div className="flex items-center gap-4 group hover:translate-x-2 transition-all duration-300 ease-in-out">
                <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300 flex-shrink-0">
                  <FaPhoneAlt className="text-white" />
                </div>
                <a href="tel:8700629458" className="text-gray-100 font-medium transition-colors duration-300 hover:text-yellow-300">
                  +91 8700629458
                </a>
              </div>
              {/* Email */}
              <div className="flex items-center gap-4 group hover:translate-x-2 transition-all duration-300 ease-in-out">
                <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300 flex-shrink-0">
                  <FaEnvelope className="text-white" />
                </div>
                <a href="mailto:mohdsadiqameen989@gmail.com" className="text-gray-100 font-medium transition-colors duration-300 hover:text-yellow-300 break-all">
                  mohdsadiqameen989@gmail.com
                </a>
              </div>
              {/* Address */}
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ease-in-out">
                <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300 mt-1 flex-shrink-0">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <a href="https://www.google.com/maps/search/?q=New+Delhi" target="_blank" rel="noopener noreferrer" className="text-gray-100 font-medium transition-colors duration-300 hover:text-yellow-300">
                  Rz-58/1, Street no. 3, Tughlakabad Extension, New Delhi-110019
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links - Added useful structure to the third column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xl font-bold mb-5 relative inline-block pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 rounded-full"></span>
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block transform">Home</Link>
              <Link to="/about" className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block transform">About Us</Link>
              <Link to="/products" className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block transform">Products</Link>
              <Link to="/contact" className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block transform">Contact</Link>
            </nav>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-green-700/50 text-center">
          <p className="text-base md:text-lg font-medium">
            &copy; {new Date().getFullYear()} Albaan Foods. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-300">
            Designed with 💚 for dairy lovers
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;