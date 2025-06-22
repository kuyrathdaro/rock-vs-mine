import React from "react";
import { NavLink } from "react-router";

const Navbar: React.FC = () => {
  return (
    <nav className="text-white py-3 flex justify-end items-center sticky top-0 z-50">
      <div className="flex items-center space-x-6 mr-8">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "hover:opacity-80 transition-opacity text-lg font-semibold pb-1" +
            (isActive ? " underline underline-offset-4" : "")
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            "hover:opacity-80 transition-opacity text-lg font-semibold pb-1" +
            (isActive ? " underline underline-offset-4" : "")
          }
        >
          History
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
