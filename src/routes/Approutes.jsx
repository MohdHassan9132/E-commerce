// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../components/Home";
// import Products from "../components/Products";
// import ProductDetails from "../components/ProductDetails";
// import Cart from "../components/Cart";
// import Checkout from "../components/Checkout";
// import Profile from "../components/Profile";
// import Login from "../components/Login";
// import Signup from "../components/Signup";
// import PrivateRoute from "../auth/PrivateRoute";

// export default function AppRoutes() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
        
//         {/* Protected Routes */}
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/checkout"
//           element={
//             <PrivateRoute>
//               <Checkout />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }
