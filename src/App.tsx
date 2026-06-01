import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';

export default function App() {
  return (
    <Router>
      <main className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </Router>
  );
}