import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import OceanScene from "./OceanScene"; // Import the ocean background component

const Layout: React.FC = () => (
  <div className="flex flex-col min-h-screen relative overflow-hidden">
    <OceanScene /> {/* Ocean background */}
    <Navbar />
    <main className="flex-1 relative z-30 flex flex-col">
      <Outlet />
    </main>
    <Footer year={2025} />
  </div>
);

export default Layout;
