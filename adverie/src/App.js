import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'

import Header from "./components/Header";
import Home from './pages/Home';
import Objects from './pages/Objects';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detections" element={<Objects />} />
      </Routes>
    </Router>
  );
}

export default App;