import React from "react";
import darkMine from "../assets/mine-dark.svg";
import rock from "../assets/rock.svg";
import { NavLink } from "react-router"; // Use react-router-dom

type FooterProps = {
  year: number;
};

const Footer: React.FC<FooterProps> = ({ year }) => (
  <footer className="relative z-0 text-center p-0 mt-8">
    <div className="w-full flex flex-col items-center justify-end relative overflow-hidden">
      <NavLink
        to="/"
        end
        className="flex items-center justify-center mb-2 text-2xl font-semibold text-gray-100 drop-shadow-lg"
      >
        <span className="mr-2 text-xl">Rock</span>
        <img src={rock} alt="Rock" className="h-7 w-7 inline mr-2" />
        <span className="text-xl font-bold">vs</span>
        <img src={darkMine} alt="Mine" className="h-6 w-6 inline ml-2" />
        <span className="ml-2 text-xl">Mine</span>
      </NavLink>
      <div className="mb-1">
        <NavLink
          to="/terms-privacy"
          end
          className="text-xs text-blue-200 hover:underline mx-2"
          rel="noopener noreferrer"
        >
          Terms & Privacy
        </NavLink>
      </div>
      <span className="block text-sm text-center text-white/90 pb-2 px-2 mx-auto w-fit drop-shadow">
        © {year}. Made with ❤️ using React, Tailwind CSS & Scikit-learn.
      </span>
    </div>
  </footer>
);

export default Footer;
