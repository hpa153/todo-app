import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';
import Main from './pages/Main/Main';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`${theme} container`}>
      <Navbar />
      <Main />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
