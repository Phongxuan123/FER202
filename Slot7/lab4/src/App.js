import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';
import Exercise1 from './components/Exercise1/Exercise1.js';
import Exercise2 from './components/Exercise2/Exercise2.js';
import Exercise3 from './components/Exercise3/Exercise3.js';
import Exercise4 from './components/Exercise4/Exercise4.js';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise1" element={<Exercise1 />} />
          <Route path="/exercise2" element={<Exercise2 />} />
          <Route path="/exercise3" element={<Exercise3 />} />
          <Route path="/exercise4" element={<Exercise4 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
