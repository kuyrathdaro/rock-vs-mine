import React from "react";
import RockVsMineLogo from "./RockVsMineLogo";
import historyIcon from "../assets/history.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="backdrop-blur-md text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      <a
        href="/"
        className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
      >
        <RockVsMineLogo />
      </a>
      <div>
        <a href="/history" className="hover:opacity-80 transition-opacity">
          <img src={historyIcon} alt="History" className="h-7 w-7" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
