import React, { useEffect, useRef, useState } from "react";
import { useExplosion } from "../hooks/useExplosion";
import "../styles/submarine.css";

const SUBMARINE_WIDTH = 320;
const SUBMARINE_HEIGHT = 88;

const getRandomLeft = () => `${Math.floor(Math.random() * 80)}%`;
const getRandomTop = () => `${Math.floor(Math.random() * 60) + 10}%`;

const Submarine: React.FC = () => {
  const { explode } = useExplosion();
  const [left, setLeft] = useState(getRandomLeft());
  const [top, setTop] = useState(getRandomTop());
  const [flip, setFlip] = useState(false);
  const moveTimeout = useRef<number | null>(null);

  // Explosion visibility state
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    if (explode) {
      setShowExplosion(true);
      const timer = setTimeout(() => setShowExplosion(false), 1200);
      return () => clearTimeout(timer);
    } else {
      setShowExplosion(false);
    }
  }, [explode]);

  useEffect(() => {
    if (explode) return;
    const move = () => {
      const newLeft = getRandomLeft();
      const newTop = getRandomTop();
      setFlip(newLeft < left);
      setLeft(newLeft);
      setTop(newTop);
      moveTimeout.current = window.setTimeout(
        move,
        Math.random() * 6000 + 12000
      );
    };
    moveTimeout.current = window.setTimeout(move, 4000);
    return () => {
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
    // eslint-disable-next-line
  }, [left, explode]);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        transition: "left 10s cubic-bezier(.4,2,.6,1), top 10s cubic-bezier(.4,2,.6,1)",
        zIndex: 20,
        width: `${SUBMARINE_WIDTH}px`,
        height: `${SUBMARINE_HEIGHT}px`,
        pointerEvents: "none",
      }}
    >
      {!explode && !showExplosion ? (
        <svg
          width={SUBMARINE_WIDTH}
          height={SUBMARINE_HEIGHT}
          viewBox="0 0 320 88"
          style={{
            transform: flip ? "scaleX(-1)" : undefined,
            transition: "transform 0.5s",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Radar/Sonar pulses */}
          <g>
            <circle
              cx="270"
              cy="44"
              r="18"
              fill="none"
              stroke="#90caf9"
              strokeWidth="2"
              opacity="0.5"
              className="sonar-pulse"
            />
            <circle
              cx="270"
              cy="44"
              r="28"
              fill="none"
              stroke="#90caf9"
              strokeWidth="1"
              opacity="0.3"
              className="sonar-pulse2"
            />
            <circle
              cx="270"
              cy="44"
              r="38"
              fill="none"
              stroke="#90caf9"
              strokeWidth="1"
              opacity="0.15"
              className="sonar-pulse3"
            />
          </g>
          {/* Submarine body */}
          <ellipse cx="160" cy="44" rx="110" ry="30" fill="#3a3a3a" stroke="#222" strokeWidth="4" />
          {/* Submarine deck */}
          <rect x="200" y="20" width="30" height="32" fill="#555" stroke="#222" strokeWidth="3" rx="8" />
          {/* Submarine window */}
          <circle cx="230" cy="36" r="8" fill="#90caf9" stroke="#222" strokeWidth="2" />
          {/* Submarine propeller */}
          <rect x="40" y="38" width="16" height="12" fill="#888" stroke="#222" strokeWidth="2" rx="3" />
          {/* Periscope */}
          <rect x="215" y="8" width="6" height="18" fill="#bbb" stroke="#222" strokeWidth="2" rx="2" />
          <circle cx="218" cy="8" r="4" fill="#90caf9" stroke="#222" strokeWidth="1" />
          {/* Fins */}
          <polygon points="60,44 30,34 30,54" fill="#666" stroke="#222" strokeWidth="2" />
          {/* Sonar dome */}
          <ellipse cx="270" cy="44" rx="12" ry="18" fill="#90caf9" opacity="0.3" />
          <style>
            {`
      .sonar-pulse {
        animation: sonarPulse 2s infinite;
        transform-origin: 270px 44px;
      }
      .sonar-pulse2 {
        animation: sonarPulse 2s infinite 0.5s;
        transform-origin: 270px 44px;
      }
      .sonar-pulse3 {
        animation: sonarPulse 2s infinite 1s;
        transform-origin: 270px 44px;
      }
      @keyframes sonarPulse {
        0% {
          opacity: 0.5;
          transform: scale(1);
        }
        70% {
          opacity: 0.1;
          transform: scale(1.4);
        }
        100% {
          opacity: 0;
          transform: scale(1.7);
        }
      }
    `}
          </style>
        </svg>
      ) : showExplosion ? (
        // Cool explosion animation
        <svg
          width={SUBMARINE_WIDTH}
          height={SUBMARINE_HEIGHT}
          viewBox="0 0 320 88"
        >
          {/* Radar/Sonar pulses */}
          <g>
            <circle
              cx="270"
              cy="44"
              r="18"
              fill="none"
              stroke="#90caf9"
              strokeWidth="2"
              opacity="0.5"
              className="sonar-pulse"
            />
            <circle
              cx="270"
              cy="44"
              r="28"
              fill="none"
              stroke="#90caf9"
              strokeWidth="1"
              opacity="0.3"
              className="sonar-pulse2"
            />
            <circle
              cx="270"
              cy="44"
              r="38"
              fill="none"
              stroke="#90caf9"
              strokeWidth="1"
              opacity="0.15"
              className="sonar-pulse3"
            />
          </g>
          {/* Explosion effect */}
          <g>
            <circle
              cx="160"
              cy="44"
              r="10"
              fill="url(#explosionGradient)"
              opacity="0.9"
            >
              <animate
                attributeName="r"
                from="10"
                to="60"
                dur="0.5s"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                from="0.9"
                to="0"
                dur="0.8s"
                fill="freeze"
              />
            </circle>
            <circle
              cx="160"
              cy="44"
              r="20"
              fill="#fff700"
              opacity="0.5"
            >
              <animate
                attributeName="r"
                from="20"
                to="80"
                dur="0.7s"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="0.7s"
                fill="freeze"
              />
            </circle>
            <circle
              cx="120"
              cy="44"
              r="6"
              fill="#ff5252"
              opacity="0.7"
            >
              <animate
                attributeName="cx"
                from="160"
                to="120"
                dur="0.7s"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                from="0.7"
                to="0"
                dur="0.7s"
                fill="freeze"
              />
            </circle>
            <circle
              cx="200"
              cy="44"
              r="6"
              fill="#ff5252"
              opacity="0.7"
            >
              <animate
                attributeName="cx"
                from="160"
                to="200"
                dur="0.7s"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                from="0.7"
                to="0"
                dur="0.7s"
                fill="freeze"
              />
            </circle>
            <defs>
              <radialGradient id="explosionGradient">
                <stop offset="0%" stopColor="#fff700" />
                <stop offset="60%" stopColor="#ff5252" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </g>
          <style>
            {`
      .sonar-pulse {
        animation: sonarPulse 2s infinite;
        transform-origin: 270px 44px;
      }
      .sonar-pulse2 {
        animation: sonarPulse 2s infinite 0.5s;
        transform-origin: 270px 44px;
      }
      .sonar-pulse3 {
        animation: sonarPulse 2s infinite 1s;
        transform-origin: 270px 44px;
      }
      @keyframes sonarPulse {
        0% {
          opacity: 0.5;
          transform: scale(1);
        }
        70% {
          opacity: 0.1;
          transform: scale(1.4);
        }
        100% {
          opacity: 0;
          transform: scale(1.7);
        }
      }
    `}
          </style>
        </svg>
      ) : null}
    </div>
  );
};

export default Submarine;