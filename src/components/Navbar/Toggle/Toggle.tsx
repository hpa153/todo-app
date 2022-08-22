import React, { useContext } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

import "./style.scss";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Toggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="toggle" onClick={toggleTheme}>
      <FiMoon className="toggle-item" />
      <FiSun className="toggle-item" />
      <div 
        className="toggle-item toggle-btn"
        style={ theme === "dark" ? {left: "2px"} : {right: "2px"} }
      ></div>
    </div>
  );
};

export default Toggle;
