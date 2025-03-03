import React from 'react'

function Footer() {
  return (
    <footer className="bg-yellow-600 text-white text-center p-4 mt-10">
      <p>&copy; 2025 Albaan Dairy Foods. All rights reserved.</p>
      <div className="mt-2">
        <a href="#" className="mx-2 text-gray-900 font-semibold hover:text-white transition-colors">About Us</a>
        <a href="#" className="mx-2 text-gray-900 font-semibold hover:text-white transition-colors">Contact</a>
        <a href="#" className="mx-2 text-gray-900 font-semibold hover:text-white transition-colors">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
