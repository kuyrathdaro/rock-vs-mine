import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div>
        <Navbar />
        <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            {children}
        </main>
        <Footer year={new Date().getFullYear()} appName="Rock vs Mine" />
    </div>
)

export default Layout;