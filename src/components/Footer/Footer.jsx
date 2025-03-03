import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-yellow-600 text-white text-center p-6 mt-10">
      <p className="text-lg font-semibold">
        &copy; 2025 Albaan Dairy Foods. All rights reserved.
      </p>

      {/* Contact Information */}
      <div className="flex justify-center items-center gap-24 mt-4">
        {/* Phone Number */}
        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-white text-xl transition-colors duration-300 group-hover:text-yellow-300" />
          <a
            href="tel:8700629458"
            className="text-white font-medium transition-colors duration-300 hover:text-yellow-300 active:scale-95"
          >
            8700629458
          </a>
        </div>

        {/* Email Address */}
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-white text-xl transition-colors duration-300 group-hover:text-yellow-300" />
          <a
            href="mailto:mohdsadiqameen989@gmail.com"
            className="text-white font-medium transition-colors duration-300 hover:text-yellow-300 active:scale-95"
          >
            mohdsadiqameen989@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

