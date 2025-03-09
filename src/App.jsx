import "./App.css";
import { Outlet } from "react-router-dom";
import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const PAYPAL_CLIENT_ID = "Ads9sS4wg2J7MeTNHDVLKhtB49uVcaxly-3_lxN4FFUOovasFo8zqiA3MksfL2n44_yISy1aiZBwMnpz";

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: "INR" }}>
      <Header />
      <Outlet /> {/* This renders nested routes */}
      <Footer />
    </PayPalScriptProvider>
  );
}

export default App;
