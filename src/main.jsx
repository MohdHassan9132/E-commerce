import { StrictMode } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./components/Home/Home.jsx";
import Products from "./components/Products/Products.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import Orders from "./components/Orders/Orders.jsx"; // New Orders page
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/Signup.jsx";
import Logout from "./components/Logout/Logout.jsx";
import AddProduct from "./components/AddProduct/AddProduct.jsx";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail.jsx";
import CheckEmail from "./components/CheckEmail/CheckEmal.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy.jsx";
import AccountDeletion from "./components/AccountDeletion/AccountDeletion.jsx";
import AdminOrders from "./components/AdminOrders/Adminorders.jsx";
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
      { path: "checkout", element:  <PrivateRoute> <Checkout /> </PrivateRoute> },
      { path: "orders", element:   <PrivateRoute> <Orders /> </PrivateRoute>  },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "logout", element: <Logout /> },
      {path: "check-email", element: <CheckEmail/>},
      { path: "addproducts", element: <PrivateRoute> <AddProduct />  </PrivateRoute> },
      {path: "verify", element: <VerifyEmail/>},
      {path : "privacypolicy", element: <PrivacyPolicy/>},
      {path : "accountdeletion",element: <AccountDeletion/>},
      {path: "adminorders",element: <AdminOrders/>}
    ],
  },
],
{basename:"/"}
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </CartProvider>
  </StrictMode>
);
