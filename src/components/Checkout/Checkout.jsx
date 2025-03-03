import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import qrcode from "../../assets/qr-code.jpg";

export default function Checkout() {
  const whatsappNumber = "918700629458";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <img src={qrcode} alt="QR Code" className="w-48 h-48 mx-auto rounded-md shadow-md mb-4" />
        <p className="text-gray-600 text-lg">Use any UPI app to scan and complete the payment.</p>

        {/* OR Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-4 text-gray-500 text- font-medium">OR</div>
        </div>

        {/* WhatsApp Contact Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 mt-4 bg-green-500 text-white px-5 py-3 text-lg rounded-lg shadow-md hover:bg-green-600 transition"
        >
          <FaWhatsapp className="text-2xl" />
          <span>WhatsApp Here</span>
        </a>
      </div>
    </div>
  );
}
