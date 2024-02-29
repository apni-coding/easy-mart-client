import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import OTPVerify from './pages/OTPVerfiy/OTPVefiy';
import ProductCard from './components/products/ProductCard';

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/otpverify" element={<OTPVerify />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/product" element={<ProductCard />} />
    //   </Routes>
    // </Router>
    <>
    <ProductCard />
    <ProductCard />
    <ProductCard />
    </>
  );
}

export default App;
