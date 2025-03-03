import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white p-8 mt-10 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-6">Albaan Foods</h3>
          
          {/* Decorative Divider */}
          <div className="w-24 h-1 bg-yellow-400 rounded-full mb-6"></div>
          
          {/* Contact Information */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 mt-2 max-w-5xl">
            {/* Phone Number */}
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
                <FaPhoneAlt className="text-white text-lg" />
              </div>
              <a
                href="tel:8700629458"
                className="text-gray-100 font-medium transition-colors duration-300 hover:text-yellow-300 active:scale-95"
              >
                8700629458
              </a>
            </div>

            {/* Email Address */}
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
                <FaEnvelope className="text-white text-lg" />
              </div>
              <a
                href="mailto:mohdsadiqameen989@gmail.com"
                className="text-gray-100 font-medium transition-colors duration-300 hover:text-yellow-300 active:scale-95"
              >
                mohdsadiqameen989@gmail.com
              </a>
            </div>

            {/* Physical Address */}
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
                <FaMapMarkerAlt className="text-white text-lg" />
              </div>
              <a
                href="https://www.google.com/maps/search/?q=New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 font-medium transition-colors duration-300 hover:text-yellow-300 active:scale-95"
              >
                Rz-58/1, Street no. 3, Tughlakabad Extension, New Delhi-110019
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-green-700 text-center">
          <p className="text-lg font-semibold">
            &copy; 2025 Albaan Foods. All rights reserved.
          </p>
          
          {/* Quick Links - Optional */}
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-yellow-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-yellow-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-yellow-300 transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;