import React from "react";
import { NavLink } from "react-router";

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 className="text-6xl font-bold text-blue-400 drop-shadow mb-4">404</h1>
    <p className="text-2xl text-white mb-2">Oops! The page you’re looking for is lost at sea.</p>
    <p className="text-lg text-blue-200 mb-6">
      Maybe it’s sunk to the ocean floor or never existed at all.
    </p>
    <NavLink
      to="/"
      end
      className="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Back to Home
    </NavLink>
    <div className="mt-8">
      <span role="img" aria-label="ocean" className="text-4xl">
        🌊 🪨 🚢 🦑
      </span>
    </div>
  </div>
);

export default NotFound;