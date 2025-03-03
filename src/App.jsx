import "./App.css";
import { Outlet } from "react-router-dom";
import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet /> {/* This renders nested routes */}
      <Footer />
    </>
  );
}

export default App;
