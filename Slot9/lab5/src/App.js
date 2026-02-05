// Sử dụng SlideBar.jsx trong App.js:
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarPizza from './components/NavBarPizzar';
import DangKyForm from './components/DangKyForm';
import Home from './components/Home';
import SlideBar from './components/SlideBar';
import NewPage from './pages/NewPage';
import Contact from './components/Contact';
import Quiz from './components/Quiz';

function App() {
  return (
    <Router>
      {/* Thanh điều hướng cho ứng dụng đặt pizza */}
      <NavBarPizza />
      <SlideBar />
    {/*Điều hướng ứng dụng đặt pizza với các liên kết đến các trang khác nhau*/}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<NewPage />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/register" element={<DangKyForm />} />
      <Route path="/contact" element={<Contact />} />
    
    </Routes>   
  </Router> 
  );
}

export default App;