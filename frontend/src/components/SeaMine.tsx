import React from "react";
import "../assets/css/sea-mine.css"; // Import the CSS for the sea mine

type SeaMineProps = {
  left: string;
  chainHeight: number;
};

const mineSize = 44; // px

const SeaMine: React.FC<SeaMineProps> = ({ left, chainHeight }) => (
  <div
    className="sea-mine"
    style={{
      left,
      bottom: 0,
      position: "absolute",
      zIndex: 12,
      pointerEvents: "none",
      width: `${mineSize}px`,
      height: `${mineSize + chainHeight}px`, // Make room for the chain
    }}
  >
    {/* Chain */}
    <div
      className="sea-mine-chain"
      style={{
        position: "absolute",
        left: "50%",
        top: `${mineSize}px`, // Start chain just below the mine
        width: "2px",
        height: `${chainHeight}px`,
        background:
          "repeating-linear-gradient(to bottom, #64748b 0 4px, transparent 4px 8px)",
        transform: "translateX(-50%)",
        zIndex: 1,
      }}
    />
    {/* Mine body and spikes */}
    <div className="sea-mine-body"></div>
    <div className="sea-mine-spike spike-top"></div>
    <div className="sea-mine-spike spike-bottom"></div>
    <div className="sea-mine-spike spike-left"></div>
    <div className="sea-mine-spike spike-right"></div>
    <div className="sea-mine-spike spike-topleft"></div>
    <div className="sea-mine-spike spike-topright"></div>
    <div className="sea-mine-spike spike-bottomleft"></div>
    <div className="sea-mine-spike spike-bottomright"></div>
    <div className="sea-mine-center"></div>
  </div>
);

export default SeaMine;
