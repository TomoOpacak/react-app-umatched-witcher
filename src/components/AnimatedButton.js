// components/AnimatedButton.jsx
import React, { useRef } from "react";
import "../css/style.css";

const AnimatedButton = ({
  onClick,
  className = "",
  children,
  style = {},
  ...props
}) => {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    // Safe check for the button
    const btn = btnRef.current;
    if (btn) {
      btn.classList.remove("clicked");

      // Trigger reflow to restart animation safely
      void btn.offsetWidth;

      btn.classList.add("clicked");

      // Remove the class after animation completes
      setTimeout(() => {
        if (btn) btn.classList.remove("clicked");
      }, 150);
    }

    // Call the original click handler
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={btnRef}
      className={`${className} clicked-transition`}
      onClick={handleClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
