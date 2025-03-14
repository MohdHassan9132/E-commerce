import { createContext, useContext, useState, useEffect } from "react";
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID,ID } from "../appwriteConfig";
import { Account } from "appwrite";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      setLoading(true);
      const loggedInUser = await account.get();
      let userData;

      try {
        userData = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, loggedInUser.$id);
      } catch (error) {
        if (error.code === 404) {
          await saveUserToDB(loggedInUser);
          userData = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, loggedInUser.$id);
        } else {
          throw error;
        }
      }

      setUser(loggedInUser);
      setUserDoc(userData);
      setIsSeller(loggedInUser.labels?.includes("seller") || userData?.role === "seller");
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
      setUserDoc(null);
      setIsSeller(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const signup = async (email, password, name) => {
    try {
      const newUser = await account.create(ID.unique(), email, password, name);
      // await account.createSession(email, password);
      await saveUserToDB(newUser, "email");
      await checkUser();
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session);
    window.location.reload();

    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      await account.createOAuth2Session("google", `${window.location.origin}/profile`);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const loginWithFacebook = async () => {
    try {
      await account.createOAuth2Session("facebook", `${window.location.origin}/profile`);
    } catch (error) {
      console.error("Facebook login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      setUserDoc(null);
      setIsSeller(false);
      localStorage.removeItem("user");
    } catch (error) {
      throw error;
    }
  };

  // const verifyEmail = async (userId, secret) => {
  //   try {
  //     await account.updateVerification(userId, secret);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const updateProfile = async (updates) => {
    if (!user) return;
    try {
      await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id, updates);
      await checkUser();
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const saveUserToDB = async (loggedInUser, provider = "email") => {
    if (!loggedInUser) return;
    try {
      await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, loggedInUser.$id);
    } catch (error) {
      if (error.code === 404) {
        try {
          await databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID,loggedInUser.$id, {
            name: loggedInUser.name,
            email: loggedInUser.email,
            provider: provider,
            phone: "",
            address: "",
            role: "user",
          });
        } catch (creationError) {
          console.error("Error creating user document:", creationError.message);
        }
      } else {
        console.error("User check error:", error.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userDoc,
        isSeller,
        loading,
        signup,
        login,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        // verifyEmail,
        updateProfile,
        saveUserToDB,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export const useAuth = () => {
  return useContext(AuthContext);
};
