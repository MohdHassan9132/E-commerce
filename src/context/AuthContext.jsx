import { createContext, useState, useEffect } from "react";
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID } from "../appwriteConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        setLoading(true);
        const loggedInUser = await account.get();

        let userData;
        try {
          userData = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, loggedInUser.$id);
        } catch (error) {
          if (error.code === 404) {
            userData = await databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID, loggedInUser.$id, {
              name: loggedInUser.name,
              email: loggedInUser.email,
              phone: "",
              address: "",
              role: "buyer",
            });
          } else {
            throw error;
          }
        }

        setUser(loggedInUser);
        setUserDoc(userData);
        setIsSeller(userData.role === "seller");
      } catch (error) {
        setUser(null);
        setUserDoc(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const updateUserProfile = async () => {
    try {
      if (!user) return;
      const updatedData = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id);
      setUserDoc(updatedData);
      setIsSeller(updatedData.role === "seller");
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, userDoc, setUserDoc, isSeller, updateUserProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
