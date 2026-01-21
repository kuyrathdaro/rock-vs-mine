import React, { useEffect, useRef, useMemo } from "react";
import "../styles/ocean.css";
import SeaMine from "./SeaMine";
import SeaWeed from "./SeaWeed";
import Rock from "./Rock";
import Submarine from "./Submarine";

const NUM_SEAWEEDS: number = 100;
const NUM_MINES: number = 5;
const NUM_ROCKS: number = 20;

const OceanScene: React.FC = () => {
  const oceanRef = useRef<HTMLDivElement>(null);

    const mines = useMemo(
    () =>
      Array.from({ length: NUM_MINES }).map((_, i) => ({
        key: `mine-${i}`,
        left: `${Math.floor(Math.random() * 85) + 5}%`,
        chainHeight: Math.floor(Math.random() * 50) + 80,
      })),
    []
  );
  const rocks = useMemo(
    () =>
      Array.from({ length: NUM_ROCKS }).map((_, i) => ({
        key: `rock-${i}`,
        left: `${Math.floor(Math.random() * 95)}%`,
        size: Math.floor(Math.random() * 40) + 20,
      })),
    []
  );
  const seaweeds = useMemo(
    () =>
      Array.from({ length: NUM_SEAWEEDS }).map((_, i) => ({
        key: `seaweed-${i}`,
        left: `${Math.floor(Math.random() * 95)}%`,
        height: Math.floor(Math.random() * 100) + 60,
      })),
    []
  );

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
      className="ocean-bg absolute top-0 left-0 w-full min-h-full z-0"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <Submarine />
      {mines.map((mine) => (
        <SeaMine key={mine.key} left={mine.left} chainHeight={mine.chainHeight} />
      ))}
      {rocks.map((rock) => (
        <Rock key={rock.key} left={rock.left} size={rock.size} />
      ))}
      {seaweeds.map((weed) => (
        <SeaWeed key={weed.key} left={weed.left} height={weed.height} zIndex={100} />
      ))}
    </div>
  );
};

export default OceanScene;
