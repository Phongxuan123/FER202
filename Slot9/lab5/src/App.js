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
import LazyLoadingDemo from './components/LazyLoadingDemo';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
import ErrorTestPage from './pages/ErrorTestPage';

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
      <Route path="/lazy-loading" element={<LazyLoadingDemo />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/error-test" element={<ErrorTestPage />} />
      <Route path="/register" element={<DangKyForm />} />
      <Route path="/contact" element={<Contact />} />
    
    </Routes>   
  </Router> 
  );
}

export default App;