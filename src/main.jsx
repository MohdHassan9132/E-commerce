import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider, SignUp } from "@clerk/clerk-react";
import Home from "./components/Home/Home.jsx";
import Products from "./components/Products/Products.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Cart from "./components/Cart/Cart.jsx";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/Checkout/Checkout.jsx";
import Login from "./components/Login/Login.jsx";
import Logout from "./components/Logout/Logout.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Clerk Publishable Key is missing. Check your .env file.");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App.jsx handles layout
    children: [
      { path: "", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "profile", element: <Profile /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "logout", element: <Logout /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ClerkProvider>
  </StrictMode>
);
