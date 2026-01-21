import React from "react";

type RockProps = {
  left: string;
  size: number;
  zIndex?: number;
};

const Rock: React.FC<RockProps> = ({ left, size, zIndex = 101 }) => (
  <svg
    className="rock"
    style={{
      position: "absolute",
      bottom: 0,
      left,
      width: `${size * 2}px`, // wider
      height: `${size * 0.8}px`, // flatter
      zIndex,
      opacity: 0.92
    }}
    viewBox="0 0 120 60"
    fill="none"
  >
    {/* Main boulder shape, flat bottom */}
    <path
      d="M10 50 Q5 25 30 20 Q35 5 60 10 Q90 5 110 30 Q120 50 90 55 Q60 60 30 55 Q15 60 10 50Z"
      fill="#78716c"
      stroke="#44403c"
      strokeWidth="2"
    />
    {/* Shading */}
    <ellipse cx="70" cy="38" rx="22" ry="8" fill="#57534e" opacity="0.4" />
    {/* Highlight */}
    <ellipse cx="45" cy="28" rx="10" ry="3" fill="#a8a29e" opacity="0.3" />
  </svg>
);

export default Rock;