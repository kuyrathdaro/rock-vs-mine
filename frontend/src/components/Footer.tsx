import React from "react";

type FooterProps = {
  year: number;
  appName: string;
};

const Footer: React.FC<FooterProps> = ({ year, appName }) => (
  <footer style={{ padding: '1rem', background: '#222', color: '#fff', textAlign: 'center' }}>
    <div>
      &copy; {year} {appName}
    </div>
    <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
      Built with <a href="https://react.dev/" style={{ color: '#61dafb' }}>React</a> &amp; <a href="https://vitejs.dev/" style={{ color: '#ffd700' }}>Vite</a>
      {' | '}
      <a href="https://github.com/yourusername/rock-vs-mine" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>
        GitHub
      </a>
      {' | '}
      <span>Contact: <a href="mailto:your@email.com" style={{ color: '#fff', textDecoration: 'underline' }}>your@email.com</a></span>
    </div>
  </footer>
);

export default Footer;
