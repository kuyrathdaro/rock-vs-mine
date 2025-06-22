import './App.css'
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import History from './pages/history';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
