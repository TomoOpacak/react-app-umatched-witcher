import React from "react";
import "../css/style.css";

const HeartHP = ({ hp, animate, damageOrHeal, color = "red" }) => {
  const animationClass = animate
    ? damageOrHeal === "healed"
      ? "heart-animate-outwards"
      : "heart-animate-inwards"
    : "";

  return (
    <div
      style={{
        width: "110px",
        height: "110px",
        overflow: "visible",
        display: "inline-block",
      }}
    >
      <svg
        className={`heart-svg ${animationClass}`}
        width="110"
        height="110"
        viewBox="0 0 50 50" // Expanded canvas
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heartShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="1.5"
              floodColor="black"
              floodOpacity="0.5"
            />
          </filter>
        </defs>

        <path
          d="M35,8c-4.5,0-8.4,3-10,7.1C23.4,11,19.5,8,15,8C8.9,8,4,13.3,4,19.5
            C4,30,25,44,25,44s21-14,21-24.5C46,13.3,41.1,8,35,8z"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
          filter="url(#heartShadow)"
        />

        <text
          x="25"
          y="28"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fontWeight="bold"
          fill="white"
          stroke="black"
          strokeWidth="2.0"
          paintOrder="stroke"
        >
          {hp}
        </text>
      </svg>
    </div>
  );
};

export default HeartHP;
