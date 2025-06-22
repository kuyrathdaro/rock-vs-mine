import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import OceanScene from "./OceanScene"; // Import the ocean background component

const Layout: React.FC = () => (
  <div className="min-h-screen flex flex-col relative overflow-hidden">
    <OceanScene /> {/* Ocean background */}
    <Navbar />
    <main className="flex-1 relative z-30">
      <Outlet />
    </main>
    <Footer year={2025} />
  </div>
);

export default Layout;
