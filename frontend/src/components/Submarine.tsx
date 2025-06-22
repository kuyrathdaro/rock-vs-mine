import React, { useEffect, useRef, useState } from "react";
import "../assets/css/submarine.css"; // Import submarine styles

const SUBMARINE_WIDTH: number = 320; // Matches SVG viewBox width
const SUBMARINE_HEIGHT: number = 88; // Matches SVG viewBox height

const getRandomLeft = () => `${Math.floor(Math.random() * 80) + 5}%`;
const getRandomTop = () => `${Math.floor(Math.random() * 35) + 5}%`;

const Submarine: React.FC = () => {
  const [left, setLeft] = useState(getRandomLeft());
  const [top, setTop] = useState(getRandomTop());
  const [flip, setFlip] = useState(false);
  const moveTimeout = useRef<number | null>(null);

  useEffect(() => {
    const move = () => {
      const newLeft = getRandomLeft();
      const newTop = getRandomTop();
      setFlip(newLeft < left);
      setLeft(newLeft);
      setTop(newTop);
      // Move every 12–18 seconds for slower movement
      moveTimeout.current = window.setTimeout(
        move,
        Math.random() * 6000 + 12000
      );
    };
    moveTimeout.current = window.setTimeout(move, 4000);
    return () => {
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, [left]);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        transition:
          "left 10s cubic-bezier(.4,2,.6,1), top 10s cubic-bezier(.4,2,.6,1)",
        zIndex: 20,
        width: `${SUBMARINE_WIDTH}px`,
        height: `${SUBMARINE_HEIGHT}px`,
        pointerEvents: "none",
      }}
    >
      {/* Sonar Radar */}
      <div className="sonar-radar" style={{ animationDelay: "0s" }} />
      <div className="sonar-radar" style={{ animationDelay: "0.7s" }} />
      <div className="sonar-radar" style={{ animationDelay: "1.4s" }} />
      {/* Submarine SVG */}
      <svg
        width={SUBMARINE_WIDTH}
        height={SUBMARINE_HEIGHT}
        viewBox="0 0 320 88"
        style={{
          transform: flip ? "scaleX(-1)" : undefined,
          transition: "transform 0.5s",
        }}
      >
        {/* Submarine body */}
        <ellipse cx="160" cy="60" rx="120" ry="28" fill="#475569" />
        {/* Hull shadow */}
        <ellipse
          cx="160"
          cy="72"
          rx="110"
          ry="16"
          fill="#334155"
          opacity="0.3"
        />
        {/* Conning tower */}
        <rect x="130" y="28" width="60" height="32" rx="12" fill="#64748b" />
        {/* Periscope */}
        <rect x="185" y="10" width="6" height="24" rx="3" fill="#64748b" />
        <rect x="183" y="6" width="10" height="8" rx="4" fill="#64748b" />
        {/* Windows */}
        <ellipse
          cx="150"
          cy="44"
          rx="8"
          ry="8"
          fill="#bae6fd"
          stroke="#38bdf8"
          strokeWidth="3"
        />
        <ellipse
          cx="170"
          cy="44"
          rx="8"
          ry="8"
          fill="#bae6fd"
          stroke="#38bdf8"
          strokeWidth="3"
        />
        {/* Propeller */}
        <ellipse cx="40" cy="60" rx="10" ry="10" fill="#fbbf24" />
        <rect
          x="30"
          y="56"
          width="8"
          height="8"
          rx="2"
          fill="#fbbf24"
          transform="rotate(-20 34 60)"
        />
        <rect
          x="42"
          y="56"
          width="8"
          height="8"
          rx="2"
          fill="#fbbf24"
          transform="rotate(20 46 60)"
        />
        {/* Fins */}
        <rect x="260" y="70" width="24" height="8" rx="4" fill="#64748b" />
        <rect x="260" y="50" width="24" height="8" rx="4" fill="#64748b" />
      </svg>
    </div>
  );
};

export default Submarine;
