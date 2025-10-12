import React, { useState } from "react";
import "../App.css";

const Button = ({
  color = "#007bff",
  text = "Click me",
  padding = "10px 20px",
  fontSize = "16px",
  borderRadius = "8px",
  textColor = "white",
  hoverColor = "#0056b3",
  transition = "0.3s ease",
  onClick
  
}) => {
  const [isHovered, setIsHovered] = useState(false);
 
  return (
    <button
       onClick={onClick}
      style={{
        backgroundColor: isHovered ? hoverColor : color,
        padding: padding,
        fontSize: fontSize,
        color: textColor,
        border: "none",
        borderRadius: borderRadius,
        cursor: "pointer",
        transition: `background-color ${transition}, transform ${transition}`,
        transform: isHovered ? "scale(1.08)" : "scale(1)",
      }}
      
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      
    >
      {text}
    </button>
  );
};

export default Button;
