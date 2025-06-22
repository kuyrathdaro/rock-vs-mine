import React, { useEffect, useRef } from "react";
import "../assets/css/ocean.css";
import SeaMine from "./SeaMine";
import SeaWeed from "./SeaWeed";
import Rock from "./Rock";
import Submarine from "./Submarine";

const NUM_SEAWEEDS: number = 100;
const NUM_MINES: number = 5;
const NUM_ROCKS: number = 20;

const OceanScene: React.FC = () => {
  const oceanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const oceanDiv = oceanRef.current;
    const createBubble = () => {
      if (!oceanDiv) return;
      const bub = document.createElement("div");
      bub.className = "bubbles";
      bub.style.left = `${Math.floor(Math.random() * oceanDiv.offsetWidth)}px`;
      bub.style.animationDelay = `${Math.random() * 10}s`;
      const size = Math.floor(Math.random() * 15) + 5;
      bub.style.width = `${size}px`;
      bub.style.height = `${size}px`;
      if (size < 25) {
        bub.style.zIndex = "-1";
        bub.style.filter = "blur(1px)";
      }
      oceanDiv.appendChild(bub);

      if (oceanDiv.getElementsByClassName("bubbles").length > 50) {
        const oldestBubble = oceanDiv.getElementsByClassName("bubbles")[0];
        if (oldestBubble && oldestBubble.parentNode) {
          oldestBubble.parentNode.removeChild(oldestBubble);
        }
      }
    };

    const bubbleInterval = setInterval(createBubble, 200);
    return () => {
      clearInterval(bubbleInterval);
      // Clean up all bubbles
      if (oceanDiv) {
        Array.from(oceanDiv.getElementsByClassName("bubbles")).forEach((bub) =>
          bub.remove()
        );
      }
    };
  }, []);

  return (
    <div
      ref={oceanRef}
      className="ocean-bg absolute inset-0 w-full h-full z-0"
      style={{ overflow: "hidden" }}
    >
      <Submarine />
      {Array.from({ length: NUM_MINES }).map(() => {
        const left = `${Math.floor(Math.random() * 85) + 5}%`;
        const chainHeight = Math.floor(Math.random() * 50) + 80;
        return <SeaMine left={left} chainHeight={chainHeight} />;
      })}
      {Array.from({ length: NUM_ROCKS }).map((_, i) => {
        const left = `${Math.floor(Math.random() * 95)}%`;
        const size = Math.floor(Math.random() * 40) + 20;
        return <Rock key={`random-rock-${i}`} left={left} size={size} />;
      })}
      {Array.from({ length: NUM_SEAWEEDS }).map((_, i) => {
        const left = `${Math.floor(Math.random() * 95)}%`;
        const height = Math.floor(Math.random() * 100) + 60;
        return <SeaWeed key={i} left={left} height={height} zIndex={100} />;
      })}
    </div>
  );
};

export default OceanScene;
