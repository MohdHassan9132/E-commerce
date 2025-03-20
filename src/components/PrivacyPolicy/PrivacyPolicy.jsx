import React from "react";

const PrivacyPolicy = () => {
    const handleEmailClick = () => {
        window.open = "mailto:qureshiayaan36@gmail.com?subject=Hello&body=I want to contact you",
        "_self";
    };
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Effective Date: [14-March-2025]</p>
      
      <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
      <p className="mb-2">We may collect the following information:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal Information: Name, email address, and other details users voluntarily provide.</li>
        <li>Non-Personal Information: Device type, browser details, and usage statistics.</li>
        <li>Data from Facebook: If you log in using Facebook, we may collect publicly available profile information.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">2. How We Use Collected Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Improve user experience and website functionality.</li>
        <li>Provide customer support and respond to inquiries.</li>
        <li>Enhance security and prevent fraud.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">3. How We Share Your Information</h2>
      <p className="mb-4">We do not sell or rent user data. However, we may share information with third-party service providers, legal authorities, or to protect our rights and users.</p>

      <h2 className="text-2xl font-semibold mt-6">4. Facebook Permissions</h2>
      <p className="mb-4">If you choose to sign in via Facebook, our platform may request access to your profile details. We do not store or use additional Facebook data without user consent.</p>

      <h2 className="text-2xl font-semibold mt-6">5. Data Security</h2>
      <p className="mb-4">We implement industry-standard security measures to safeguard user information, but no internet transmission is 100% secure.</p>

      <h2 className="text-2xl font-semibold mt-6">6. User Rights</h2>
      <p className="mb-4">Users may request access, correction, or deletion of their personal data by contacting us at [Your Contact Email].</p>

      <h2 className="text-2xl font-semibold mt-6">7. Updates to This Privacy Policy</h2>
      <p className="mb-4">We may update this Privacy Policy from time to time. Continued use of the website signifies acceptance of updated terms.</p>

      <h2 className="text-2xl font-semibold mt-6">8. Contact Information</h2>
      <p className="mb-2">For any questions contact us at:</p>
      <p className="mb-4">
  <strong>Email: </strong>
  <a className="text-blue-500 hover:underline" href="mailto:qureshiayaan36@gmail.com">
    qureshiayaan36@gmail.com
  </a>
</p>


      <p className="mb-4"><strong>Website: </strong><a className="text-blue-500 hover:underline" target="_blank" href="https://albaanfoods.netlify.app 
">Albaanfoods</a></p>

      <p className="mt-6 text-gray-600">This website is developed by a student for learning purposes, studying at <a target="_blank" href="https://jamiahamdard.edu" className="text-blue-500 hover:underline">Jamia Hamdard, Delhi</a>.</p>
    </div>
  );
};

export default PrivacyPolicy;
