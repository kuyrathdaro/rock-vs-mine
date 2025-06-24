import './App.css'
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/home';
import History from './pages/history';
import NotFound from './pages/notfound';
import TermsPrivacy from './pages/terms-privacy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="terms-privacy" element={<TermsPrivacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
