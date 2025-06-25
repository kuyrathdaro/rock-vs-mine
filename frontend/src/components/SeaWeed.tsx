import React from "react";
import "../styles/seaweed.css";

type SeaWeedProps = {
  left: string;
  height: number;
  zIndex?: number;
};

const SeaWeed: React.FC<SeaWeedProps> = ({ left, height, zIndex = 2 }) => {
  return (
    <div
      className="seaweed"
      style={{
        position: "absolute",
        bottom: 0,
        left,
        height: `${height}px`,
        width: "8px",
        zIndex,
      }}
    />
  );
};

export default SeaWeed;