import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";

import './style.scss';
import Toggle from './Toggle/Toggle';
import { ThemeContext } from '../../contexts/ThemeContext';

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [displayMenu, setDisplayMenu] = useState<boolean>(window.innerWidth > 600 ? true : false);

  useEffect(() => {
    const handleDisplayMenu = () => {
      if(window.innerWidth > 600) {
        setDisplayMenu(true);
      } else {
        setDisplayMenu(false);
      }
    };

    window.addEventListener("resize", handleDisplayMenu);
  }, []);

  return (
    <div className="nav-container">
      <div className="nav-icons">
        <div className="nav-toggle-left"><Toggle /></div>
        <div className="nav-icons--title">ToDo App</div>
        <div className="nav-toggle-right">
          <span className="nav-icons--menu-btn" onClick={()=> setDisplayMenu(!displayMenu)}><FiMenu /></span>
        </div>
      </div>
      {
        displayMenu && (
          <div className="nav-menu">
            <NavLink className='nav-menu--item' style={theme === "dark" ? {color: "#d5d5d7"} : {color: "#020038"}} to="/">Home</NavLink>
            <NavLink className='nav-menu--item' style={theme === "dark" ? {color: "#d5d5d7"} : {color: "#020038"}} to="/about">About</NavLink>
          </div>
        )
      }
    </div>
  )
}

export default Navbar;