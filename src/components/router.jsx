import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from '../pages/loginForm';
import ImageGallery from '../pages/ImageGallery';


function Redirect() {
  return ( 
    <>
    <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/Gallery" element={<ImageGallery />} />
        </Routes>
      </Router>
    </>
  
    
  )
}

export default Redirect
