import { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    address: "123, Street Name, City, India",
    subscription: "Standard Plan - ₹799/month",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>
      <div className="bg-white p-6 shadow-md rounded-lg">
        {!isEditing ? (
          <>
            <p className="text-lg"><strong>Name:</strong> {user.name}</p>
            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            <p className="text-lg"><strong>Phone:</strong> {user.phone}</p>
            <p className="text-lg"><strong>Address:</strong> {user.address}</p>
            <p className="text-lg font-semibold text-yellow-600"><strong>Subscription:</strong> {user.subscription}</p>
            <button onClick={() => setIsEditing(true)} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input type="text" name="name" value={updatedUser.name} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Name" />
            <input type="email" name="email" value={updatedUser.email} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Email" />
            <input type="tel" name="phone" value={updatedUser.phone} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Phone" />
            <input type="text" name="address" value={updatedUser.address} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Address" />
            <button onClick={handleSave} className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Profile;
